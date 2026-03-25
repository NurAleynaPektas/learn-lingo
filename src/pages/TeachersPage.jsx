import { useState } from "react";
import css from "./TeachersPage.module.css";
import TeacherCard from "../components/TeacherCard";
import teachers from "../data/teachers.json";

export default function TeachersPage() {
  const [visible, setVisible] = useState(4);

  const handleLoadMore = () => {
    setVisible((prev) => prev + 4);
  };

  return (
    <section className={css.container}>
      <div className={css.filters}>Filters will be here</div>

      <div className={css.list}>
        {teachers.slice(0, visible).map((teacher, index) => (
          <TeacherCard
            key={index}
            teacher={{
              ...teacher,
              id: teacher.name + teacher.surname, // 🔥 STABLE ID
            }}
          />
        ))}
      </div>

      {visible < teachers.length && (
        <button className={css.loadMore} onClick={handleLoadMore}>
          Load more
        </button>
      )}
    </section>
  );
}
