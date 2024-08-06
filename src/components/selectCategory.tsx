import React, { useEffect, useState } from "react";
import { fetchCategorys } from "../api";
import { CategoryType } from "../models/category";

const SelectCategory: React.FunctionComponent = (props) => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategorys();
        setCategories(data);
      } catch (err) {
        setError("Failed to fetch categories.");
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  return (
    <div className="max-w-sm mx-auto p-4 bg-white w-full rounded-xl">
      <label className="block mb-2 text-sm font-normal text-gray-900 dark:text-white">
        Nhà cung cấp
      </label>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error</p>
      ) : (
        <select
          id="countries"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm font-normal rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 selectCustom"
        >
          <option selected>Tất cả</option>
          {categories.data?.map((category) => (
            <option key={category._id} id={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default SelectCategory;
