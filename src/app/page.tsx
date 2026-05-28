import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import MentorShowcase from "@/components/landing/MentorShowcase";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <Hero />
      <Features />
      <MentorShowcase />

      {/* CTA Section */}
      <section className="py-24 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold mb-8">Ready to evolve?</h2>
          <p className="text-primary-foreground/80 text-lg mb-10 max-w-2xl mx-auto">
            Join thousands of curious minds who are learning from the masters of the past and present.
          </p>
          <div className="flex justify-center">
            <a href="/signup">
              <button className="h-14 px-10 text-lg font-bold bg-white text-primary rounded-lg hover:bg-opacity-90 transition-all active:scale-[0.98]">
                Get Started Today
              </button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
