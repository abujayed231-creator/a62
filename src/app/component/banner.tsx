export default function Banner() {
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:py-20">
      <div>
        <p className="mb-3 text-sm font-semibold tracking-[0.3em] text-[#ccff00]">WORKOUT LIBRARY</p>
        <h1 className="font-display text-4xl font-bold uppercase leading-tight sm:text-5xl lg:text-6xl">
          Train with intent. Log every set.
        </h1>
        <p className="mt-4 max-w-lg text-gray-400">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan,
          and watch the week&apos;s work add up.
        </p>
        <a
          href="#library"
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#ccff00] px-6 py-3 font-bold uppercase text-black hover:brightness-110"
        >
          Browse Workouts ↓
        </a>
      </div>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://img.magnific.com/free-photo/3d-cartoon-fitness-man_23-2151691400.jpg?w=740"
        alt="Hero"
        className="w-full rounded-xl object-cover"
      />
    </section>
  );
}