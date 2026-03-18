import css from "./TeachersPage.module.css";
import TeacherCard from "../components/TeacherCard";
export default function TeachersPage() {
  return (
    <section className={css.container}>
      <div className={css.filters}>Filters will be here</div>

      <div className={css.list}>Teachers list</div>
      <div className={css.list}>
        <TeacherCard />
        <TeacherCard />
        <TeacherCard />
      </div>
      <button className={css.loadMore}>Load more</button>
    </section>
  );
}
