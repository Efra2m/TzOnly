import "./App.css";
import Timeline from "./components/Timeline/Timeline";

const categories = [
  {
    name: "Технологии",
    years: [1981, 1982, 1983, 1984, 1985, 1986],
  },
  { name: "Кино", years: [1987, 1988, 1989, 1990, 1991] },
  { name: "Литература", years: [1992, 1993, 1994, 1995, 1996, 1997] },
  { name: "Театр", years: [1999, 2000, 2001, 2002, 2003, 2004] },
  { name: "Спорт", years: [2005, 2006, 2007, 2008, 2009, 2010] },
  { name: "Наука", years: [2015, 2016, 2017, 2018, 2019, 2020] },
];

function App() {
  return (
    <div className="App">
      <Timeline categories={categories} />
    </div>
  );
}

export default App;
