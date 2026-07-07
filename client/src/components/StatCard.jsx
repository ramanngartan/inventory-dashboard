export default function StatCard({
  title,
  value,
  icon: Icon,
  color,
  iconColor,
}) {
  return (
    <div
      className="
        bg-white
        border
        border-slate-200
        rounded-2xl
        p-6
        flex
        justify-between
        items-center
        shadow-sm
        hover:shadow-lg
        hover:-translate-y-1
        transition-all
        duration-300
      "
    >
      <div>
        <p className="text-sm font-medium text-slate-500">
          {title}
        </p>

        <h2 className="text-4xl font-bold text-slate-900 mt-2">
          {value}
        </h2>
      </div>

      <div
        className={`
          ${color}
          h-14
          w-14
          rounded-xl
          flex
          items-center
          justify-center
        `}
      >
        <Icon
          size={26}
          className={iconColor}
        />
      </div>
    </div>
  );
}