import { useEffect, useState } from "react";
import css from "./FavoritesPage.module.css";
import TeacherCard from "../components/TeacherCard";
import teachers from "../data/teachers.json";
import { auth } from "../firebase";

export default function FavoritesPage() {
  const [favoriteTeachers, setFavoriteTeachers] = useState([]);

  useEffect(() => {
    const updateFavorites = () => {
      const user = auth.currentUser;

      if (!user) {
        setFavoriteTeachers([]);
        return;
      }

      const key = `favorites_${user.uid}`;

      const storedFavorites = JSON.parse(localStorage.getItem(key)) || [];

      const filteredTeachers = teachers.filter((teacher) =>
        storedFavorites.includes(teacher.name + teacher.surname),
      );

      setFavoriteTeachers(filteredTeachers);
    };

    updateFavorites();

    window.addEventListener("favoritesChanged", updateFavorites);

    return () => {
      window.removeEventListener("favoritesChanged", updateFavorites);
    };
  }, []);

  return (
    <section className={css.container}>
      {favoriteTeachers.length > 0 ? (
        <div className={css.list}>
          {favoriteTeachers.map((teacher) => (
            <TeacherCard
              key={teacher.name + teacher.surname}
              teacher={teacher}
            />
          ))}
        </div>
      ) : (
        <p className={css.empty}>No favorite teachers yet.</p>
      )}
    </section>
  );
}
