import styles from "../page.module.css";

export default function About() {
  return (
    <div>
      <main style={{ maxWidth: "800px", margin: "2rem auto", padding: "0 1rem", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", marginBottom: "1rem" }}>
          Our Story
        </h2>
        <p style={{ marginBottom: "2rem", lineHeight: "1.6" }}>
          Handcrafted Haven is a place where artisans and shoppers connect. We believe in the value of
          craftsmanship, sustainability, and supporting small businesses. Our mission is to provide a
          platform where artisans can showcase their unique creations and shoppers can discover
          meaningful, handmade treasures. Handcrafted Haven is a marketplace connecting artisans 
          and buyers who value authenticity, quality, and culture.
        </p>

        <div style={{ height: "200px", background: "#eee", borderRadius: "12px", marginBottom: "2rem" }} />

        <h3 style={{ fontFamily: "'Playfair Display', serif", marginBottom: "1rem" }}>Our Mission</h3>
        <p style={{ lineHeight: "1.6" }}>
          To support artisans worldwide by connecting them with buyers who value quality, authenticity,
          and creativity. Together, we celebrate craftsmanship and culture.
        </p>
      </main>
    </div>
  );
}
