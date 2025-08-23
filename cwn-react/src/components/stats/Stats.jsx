import { useEffect, useState } from "react";

/**
 * Displays live community statistics. Values are fetched from an API defined
 * by the `VITE_STATS_ENDPOINT` environment variable. When the endpoint isn't
 * reachable the component falls back to the initial placeholder values.
 */
export default function Stats() {
  const [stats, setStats] = useState({
    happyLearners: 10000,
    monthlyViews: 10000,
    monthlySubscribers: 1000,
    dailySubscribers: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const endpoint = import.meta.env.VITE_STATS_ENDPOINT || "/api/stats";
        const res = await fetch(endpoint);
        if (!res.ok) throw new Error("Failed to fetch stats");
        const data = await res.json();
        setStats((prev) => ({ ...prev, ...data }));
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("Could not load stats", err);
      }
    }

    fetchStats();
  }, []);

  const format = (value) => Number(value).toLocaleString();

  return (
    <section className="section bg-main-shade mb-32">
      <div className="flex flex-col gap-3 items-center py-14">
        <h2 className="mb-5 text-white text-center text-2xl font-semibold font-poppins">
          Pakistan&apos;s Most Loved Coding Community ❤️
        </h2>
        <div className="grid xm:grid-cols-3 gap-12 xm:gap-24 text-center text-light leading-7 mb-4">
          <div>
            <h3 className="text-2xl">{format(stats.happyLearners)}</h3>
            <p className="text-xl font-semibold">Happy Learners</p>
          </div>
          <div>
            <h3 className="text-2xl">{format(stats.monthlyViews)}</h3>
            <p className="text-xl font-semibold">Monthly Views</p>
          </div>
          <div>
            <h3 className="text-2xl">{format(stats.monthlySubscribers)}</h3>
            <p className="text-xl font-semibold">Monthly Subscribers</p>
          </div>
          {stats.dailySubscribers ? (
            <div>
              <h3 className="text-2xl">{format(stats.dailySubscribers)}</h3>
              <p className="text-xl font-semibold">Daily Subscribers</p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

