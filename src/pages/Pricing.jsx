import PageNav from "../components/PageNav";
import styles from "./Pricing.module.css";
export default function Pricing() {
  return (
    <main className={styles.pricing}>
      <PageNav />
      <section>
        <img src="img-2.jpg" alt="overview of a large city with skyscrapers" />
        <div>
          <h2>
            Explore the world.
            <br />
            One simple price.
          </h2>
          <p>
            Plan your trips, save your favorite cities, and keep track of every
            adventure. Start exploring the world and make every journey
            memorable.
          </p>
        </div>
      </section>
    </main>
  );
}
