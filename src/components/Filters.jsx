import css from "./Filters.module.css";

export default function Filters({ filters, setFilters, languages, levels }) {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={css.filters}>
      {/* LANGUAGE */}
      <div className={css.selectWrapper}>
        <select
          name="language"
          value={filters.language}
          onChange={handleChange}
          className={css.select}
        >
          <option value="">All languages</option>
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>

      {/* LEVEL */}
      <div className={css.selectWrapper}>
        <select
          name="level"
          value={filters.level}
          onChange={handleChange}
          className={css.select}
        >
          <option value="">All levels</option>
          {levels.map((lvl) => (
            <option key={lvl} value={lvl}>
              {lvl}
            </option>
          ))}
        </select>
      </div>

      {/* PRICE */}
      <div className={css.selectWrapper}>
        <select
          name="price"
          value={filters.price}
          onChange={handleChange}
          className={css.select}
        >
          <option value="">Any price</option>
          <option value="0-20">0–20$</option>
          <option value="21-30">21–30$</option>
          <option value="31-50">31–50$</option>
        </select>
      </div>
    </div>
  );
}
