export interface IEvent {
  [key: string]: {
    [year: number]: string;
  };
}

export const event: IEvent = {
  Технологии: {
    1981: "Первый успешный портативный компьютер",
    1982: "Появление CD-ROM",
    1983: "Первый IBM PC",
    1984: "Создание интернета",
    1985: "Событие 4",
    1986: "Событие 5",
  },
  Кино: {
    1987: "«Хищник»/Predator, США (реж. Джон Мактирнан)",
    1988: "Оскар за лучший фильм «Форрест Гамп»",
    1989: "«Назад в будущее 2»/Back To The Future 2, США (реж. Роберт Зенекис)",
    1990: "«Крепкий орешек 2»/Die Hard 2, США (реж. Ренни Харлин)",
    1991: "«Семейка Аддамс»/The Addams Family, США (реж. Барри Зоннефельд)",
  },
  Литература: {
    1992: "Нобелевская премия по литературе - Дерек Уолкотт «За блестящий образец карибского эпоса в 64 разделах»",
    1993: "«Бессоница» роман Стивена Кинга",
    1994: "Нобелевская премия по литературе - Шеймас Хини",
    1995: "«Гарри Поттер и философкий камень» - роман Джоан Роулинг.",
    1996: "Событие 4",
    1997: "Событие 5",
  },
  Театр: {
    1999: "премьера балета «Золушка» в постановке Жана-Кристофа Майо, сценография Эрнеста Пиньона",
    2000: "возобновлено издание журнала «Театр».",
    2001: "премьера трилогии Тома Стоппарда «Берег Утопии», Королевский Национальный театр, Лондон",
    2002: "В Венеции произошло...",
    2003: "Событие 4",
    2004: "Событие 5",
  },
  Спорт: {
    2005: "Премьера «Титаника»",
    2006: "Оскар за лучший фильм «Форрест Гамп»",
    2007: "Событие 2",
    2008: "Событие 3",
    2009: "Событие 4",
    2010: "Событие 5",
  },
  Наука: {
    2015: "13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды",
    2016: "Телескоп «Хаббл» обнаружил самую удалённую из всех обнаруженных галактик, получившую обозначение GN-z11",
    2017: "Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi",
    2018: "Старт космического аппарата Solar Probe Plus, предназначенного для изучения Солнца",
    2019: "Google объявил о создании 53-кубитного квантового компьютера.",
    2020: "Корабль Crew Dragon вернулся на Землю из первого пилотируемого полёта",
  },
};
