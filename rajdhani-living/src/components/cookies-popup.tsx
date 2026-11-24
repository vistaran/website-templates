import dynamic from 'next/dynamic';
import Image from "next/image"

const CookieConsent = dynamic(() => import('react-cookie-consent').then(mod => mod.default), { ssr: false });

const CookiesPopup = () => {
    return (
        <CookieConsent
            enableDeclineButton
            onDecline={() => {}}
            disableStyles={true}
            location="bottom"
            buttonText="Accept"
            cookieName="myAwesomeCookieName2"
            containerClasses="bg-white rounded-lg px-5 pb-5 shadow-xl border border-slate-400 fixed z-50 max-w-md ml-8 mb-8"
            declineButtonClasses="bg-red-400 rounded-lg p-3 text-white mr-4"
            buttonClasses="bg-blue-600 rounded-lg p-3 text-white mr-4"
            expires={150}
        >
            <div className="items-center mb-4">
                <div className="flex justify-center mb-2">
                    <Image width={100} height={100} src="/images/cookie-image.png" alt="Cookie Icon" />
                </div>
                <div className="text-left">
                    <h2 className="text-gray-900 font-semibold mb-3">We value your privacy</h2>
                    <p className="text-gray-600">We use cookies to deliver a seamless and personalized experience. By clicking accept you agree with these cookies.</p>
                </div>
            </div>
        </CookieConsent>
    );
};

export default CookiesPopup;
