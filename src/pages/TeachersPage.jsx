import css from "./TeachersPage.module.css";
import TeacherCard from "../components/TeacherCard";

export default function TeachersPage() {
  const teachers = [
    {
      name: "John",
      surname: "Doe",
      languages: ["English"],
      price_per_hour: 30,
      experience: "5 years experience",
    },
    {
      name: "Anna",
      surname: "Smith",
      languages: ["Spanish", "English"],
      price_per_hour: 25,
      experience: "3 years experience",
    },
  ];

  return (
    <section className={css.container}>
      <div className={css.filters}>Filters will be here</div>

      <div className={css.list}>
        {teachers.map((teacher, i) => (
          <TeacherCard key={i} teacher={teacher} />
        ))}
      </div>

      <button className={css.loadMore}>Load more</button>
    </section>
  );
}
