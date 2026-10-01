import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

function appointmentApiPlugin(): Plugin {
  return {
    name: 'appointment-api-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.startsWith('/api/appointments/slots')) {
          res.setHeader('Content-Type', 'application/json');
          const slots = [
            { id: 'morning', label: 'Morning (8:00 AM – 11:00 AM)', available: true },
            { id: 'midday', label: 'Mid-Day (11:00 AM – 2:00 PM)', available: true },
            { id: 'afternoon', label: 'Afternoon (2:00 PM – 5:00 PM)', available: true },
            { id: 'evening', label: 'Evening (5:00 PM – 7:00 PM)', available: true },
          ];
          res.end(JSON.stringify({ success: true, slots }));
          return;
        }

        if (req.url?.startsWith('/api/appointments/book') && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => { body += chunk; });
          req.on('end', () => {
            try {
              const data = JSON.parse(body || '{}');
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                success: true,
                message: 'Appointment successfully booked with JP Lawn and Landscaping',
                appointmentId: data.id || `JP-${Date.now().toString().slice(-4)}`,
                appointment: data,
                calendarUrl: data.googleCalendarUrl,
              }));
            } catch (err) {
              res.statusCode = 400;
              res.end(JSON.stringify({ success: false, error: 'Invalid payload' }));
            }
          });
          return;
        }

        if (req.url?.startsWith('/api/appointments/status')) {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({
            success: true,
            status: 'operational',
            provider: 'JP Lawn and Landscaping',
            phone: '(980) 271-1494',
            location: '1400 Birch St, Kannapolis, NC 28081',
          }));
          return;
        }

        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), appointmentApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
