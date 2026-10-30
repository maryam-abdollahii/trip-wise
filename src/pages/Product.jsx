import PageNav from "../components/PageNav";
import styles from "./Pricing.module.css";

export default function Product() {
  return (
    <main className={styles.pricing}>
      <PageNav />

      <section>
        <img
          src="img-1.jpg"
          alt="person with dog overlooking mountain with sunset"
        />
        <div>
           
<h2>Discover WorldWise.</h2>
<p>
  WorldWise helps you explore the world, keep track of the cities you visit,
  and save your travel memories in one place.
</p>
<p>
  Mark the places you've been, add notes about your experiences, and look
  back on every adventure. Your journeys, your memories, all in one place.
</p>

        </div>
      </section>
    </main>
  );
}
