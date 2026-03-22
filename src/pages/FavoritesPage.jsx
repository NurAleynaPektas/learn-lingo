import css from "./TeachersPage.module.css";
import TeacherCard from "../components/TeacherCard";
import teachers from "../data/teachers.json";

export default function FavoritesPage() {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  const favTeachers = teachers.filter((t) => favorites.includes(t.id));

  return (
    <section className={css.container}>
      <div className={css.list}>
        {favTeachers.length > 0 ? (
          favTeachers.map((teacher) => (
            <TeacherCard key={teacher.id} teacher={teacher} />
          ))
        ) : (
          <p>No favorites yet</p>
        )}
      </div>
    </section>
  );
}
