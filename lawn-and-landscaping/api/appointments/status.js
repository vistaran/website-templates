// GET /api/appointments/status
export default function handler(req, res) {
  return res.status(200).json({
    success: true,
    status: 'operational',
    provider: 'JP Lawn and Landscaping',
    phone: '(980) 271-1494',
    location: '1400 Birch St, Kannapolis, NC 28081',
  });
}
