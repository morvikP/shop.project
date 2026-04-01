import { useEffect, useState } from "react";

function Filters({ filters, onChange, lockedCategoryIds = [] }) {
  const categories = [
    { id: 1, title: "Футболки" },
    { id: 2, title: "Толстовки" },
    { id: 3, title: "Куртки" },
    { id: 4, title: "Нижняя одежда" },
  ];

  const seasons = [
    { id: 1, title: "Лето-Осень" },
    { id: 2, title: "Зима-Весна" },
    { id: 3, title: "Всесезонная" },
  ];

  const sizes = ["S", "M", "L", "XL", "XXL"];

  const [selectedCategories, setSelectedCategories] = useState(filters.categoryIds || []);
  const [selectedSeasons, setSelectedSeasons] = useState(filters.seasonIds || []);
  const [selectedSizes, setSelectedSizes] = useState(filters.sizes || []);

  useEffect(() => {
    setSelectedCategories(filters.categoryIds || []);
    setSelectedSeasons(filters.seasonIds || []);
    setSelectedSizes(filters.sizes || []);
  }, [filters.categoryIds, filters.seasonIds, filters.sizes]);

  useEffect(() => {
    onChange({
      categoryIds: selectedCategories,
      seasonIds: selectedSeasons,
      sizes: selectedSizes,
    });
  }, [selectedCategories, selectedSeasons, selectedSizes, onChange]);

  const toggle = (value, selected, setSelected) => {
    if (lockedCategoryIds.length > 0 && selected === selectedCategories) {
      return;
    }
    if (selected.includes(value)) {
      setSelected(selected.filter((v) => v !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  return (
    <aside className="filters1">
      <h3 className="margin-bottom">Filters</h3>
      {lockedCategoryIds.length === 0 && (
        <div className="filter-group1">
          <h4>Category</h4>
          {categories.map((cat) => (
            <label
              key={cat.id}
              className={selectedCategories.includes(cat.id) ? "active1" : ""}
              style={{ cursor: "pointer" }}
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat.id)}
                onChange={() =>
                  toggle(cat.id, selectedCategories, setSelectedCategories)
                }
                style={{ marginRight: 6 }}
              />
              {cat.title}
            </label>
          ))}
        </div>
      )}

      <div className="filter-group1">
        <h4>Season</h4>
        {seasons.map((season) => (
          <label
            key={season.id}
            className={selectedSeasons.includes(season.id) ? "active1" : ""}
          >
            <input
              type="checkbox"
              checked={selectedSeasons.includes(season.id)}
              onChange={() =>
                toggle(season.id, selectedSeasons, setSelectedSeasons)
              }
              style={{ marginRight: 6 }}
            />
            {season.title}
          </label>
        ))}
      </div>

      <div className="filter-group1">
        <h4>Size</h4>
        <div className="sizes1">
          {sizes.map((size) => (
            <label
              key={size}
              className={selectedSizes.includes(size) ? "active1" : ""}
              style={{ marginRight: 10, cursor: "pointer" }}
            >
              <input
                type="checkbox"
                checked={selectedSizes.includes(size)}
                onChange={() => toggle(size, selectedSizes, setSelectedSizes)}
                style={{ marginRight: 4 }}
              />
              {size}
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default Filters;
