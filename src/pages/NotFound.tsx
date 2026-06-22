import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet";

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found | FutureCandy</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center px-4">
          <h1 className="mb-4 text-7xl font-bold text-gradient">404</h1>
          <p className="mb-6 text-xl text-muted-foreground">This page is not available in the FutureCandy universe.</p>
          <a href="/">
            <Button size="lg" className="glow-pink">Return to Home</Button>
          </a>
        </div>
      </div>
    </>
  );
};

export default NotFound;