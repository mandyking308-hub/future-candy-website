import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const CookiesPolicy = () => {
  return (
    <div className="min-h-screen page-transition">
      <Navigation />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            Cookies Policy
          </h1>
          <p className="text-muted-foreground mb-12">Last Updated: October 2025</p>

          <div className="prose prose-invert max-w-none space-y-8">
            <div className="glass p-8 rounded-lg">
              <p className="text-lg">
                This Cookies Policy explains what cookies are, how FutureCandy — Sweet Beats. Synthetic Dreams uses them, the types of cookies we use, and your choices regarding them.
              </p>
            </div>

            <section className="glass p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-candy-cyan mb-4">1. What are Cookies?</h2>
              <p>
                Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and to provide information to the owners of the site.
              </p>
            </section>

            <section className="glass p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-candy-violet mb-4">2. How We Use Cookies</h2>
              <p className="mb-4">FutureCandy uses cookies for the following purposes:</p>
              <ol className="space-y-3 list-[lower-alpha] list-inside">
                <li><strong>Website Functionality:</strong> To ensure the website operates correctly (e.g., maintaining your shopping cart if we sell products).</li>
                <li><strong>Analytics:</strong> To understand how users interact with our Website, which pages are most popular, and how we can improve our services. We typically use tools like Google Analytics for this purpose.</li>
                <li><strong>Advertising:</strong> To deliver targeted advertisements or retargeting campaigns relevant to your interests, where consent has been provided.</li>
              </ol>
            </section>

            <section className="glass p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-candy-pink mb-4">3. Types of Cookies Used</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-candy-cyan mb-3">3.1. Strictly Necessary Cookies</h3>
                  <p className="mb-2">
                    These are essential for the operation of our Website. They include, for example, cookies that enable you to log into secure areas or make use of e-billing services.
                  </p>
                  <p className="text-sm text-candy-violet"><strong>Lawful Basis:</strong> Legitimate Interest</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-candy-cyan mb-3">3.2. Analytical/Performance Cookies</h3>
                  <p className="mb-2">
                    These allow us to recognize and count the number of visitors and to see how visitors move around our Website when they are using it. This helps us improve the way our Website works.
                  </p>
                  <p className="text-sm text-candy-violet"><strong>Lawful Basis:</strong> Consent</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-candy-cyan mb-3">3.3. Targeting Cookies (Third-Party)</h3>
                  <p className="mb-2">
                    These cookies record your visit to our Website, the pages you have visited, and the links you have followed. We use this information to make our Website and the advertising displayed on it more relevant to your interests.
                  </p>
                  <p className="text-sm text-candy-violet"><strong>Lawful Basis:</strong> Consent</p>
                </div>
              </div>
            </section>

            <section className="glass p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-candy-violet mb-4">4. Managing Your Cookie Preferences</h2>
              <p className="mb-4">
                Upon your first visit to our Website, you will be presented with a cookie banner requesting your explicit consent for the use of non-essential cookies (Analytics and Targeting).
              </p>
              <p className="mb-4">You can manage or withdraw your consent at any time via:</p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-candy-pink mb-2">Browser Settings</h3>
                  <p>You can refuse the setting of all or some cookies by activating the relevant setting on your browser (e.g., Chrome, Safari, Firefox). If you choose to turn off all cookies, you may lose some functionality of the site.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-candy-pink mb-2">Cookie Preference Center</h3>
                  <p>You can adjust your cookie preferences through our Cookie Preference Center available on the website.</p>
                </div>
              </div>
            </section>

            <section className="glass p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-candy-cyan mb-4">5. Contact Information</h2>
              <p>
                For any questions regarding our use of cookies, please refer to our Privacy Policy or{" "}
                <a href="/contact" className="text-candy-cyan hover:underline font-semibold">
                  contact us through our contact form
                </a>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CookiesPolicy;
