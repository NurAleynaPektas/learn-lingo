import { useState, useMemo, useEffect } from "react";
import css from "./TeachersPage.module.css";
import TeacherCard from "../components/TeacherCard";
import Filters from "../components/Filters";
import teachers from "../data/teachers.json";
import Loader from "../components/Loader";

export default function TeachersPage() {
  const [visible, setVisible] = useState(4);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    language: "",
    level: "",
    price: "",
  });

  const handleLoadMore = () => {
    setVisible((prev) => prev + 4);
  };

  const languages = [...new Set(teachers.flatMap((t) => t.languages))];
  const levels = [...new Set(teachers.flatMap((t) => t.levels))];
  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
      setVisible(4); 
    }, 400);

    return () => clearTimeout(timer);
  }, [filters]);

  const filteredTeachers = useMemo(() => {
    return teachers.filter((teacher) => {
      const matchLanguage =
        !filters.language || teacher.languages.includes(filters.language);

      const matchLevel =
        !filters.level || teacher.levels.includes(filters.level);

      const matchPrice =
        !filters.price || teacher.price_per_hour <= Number(filters.price);

      return matchLanguage && matchLevel && matchPrice;
    });
  }, [filters]);

  return (
    <section className={css.container}>
      {/* LOADER */}
      {loading && <Loader />}

      {/* FILTERS */}
      <Filters
        filters={filters}
        setFilters={setFilters}
        languages={languages}
        levels={levels}
      />

      {/* LIST */}
      <div className={css.list}>
        {filteredTeachers.slice(0, visible).map((teacher) => (
          <TeacherCard
            key={teacher.name + teacher.surname}
            teacher={{
              ...teacher,
              id: teacher.name + teacher.surname,
            }}
          />
        ))}
      </div>

      {/* LOAD MORE */}
      {visible < filteredTeachers.length && (
        <button className={css.loadMore} onClick={handleLoadMore}>
          Load more
        </button>
      )}
    </section>
  );
}
