import React from 'react';
import Category from '../model/category';
import UpdateCategoryModel from '../model/updateCategoryModel';
import {useUpdateCategoryMutation} from '../api/transactionApi';
import {Dropdown, DropdownChangeParams} from 'primereact/dropdown';
import {useDispatch} from 'react-redux';
import {errorToast} from '../toast/toastSlice';

type DropDownProps = {
    transactionId: number;
    categories: Category[]|undefined;
    selectedCategory: number | undefined;
};

const CategoryDropDown = ({
    transactionId,
    categories,
    selectedCategory,
}:DropDownProps)=>{
    const [updateCategory] = useUpdateCategoryMutation();
    const dispatch = useDispatch();
    
    const onClickHandler = async (category: Category): Promise<void> => {
        if (!category) {
            dispatch(errorToast(`Couldn't find category`));
            return;
        }
        
        const body: UpdateCategoryModel = {
            transactionId: transactionId,
            category: category,
        };
        await updateCategory(body);
    };
    
    const mapCategories = categories?.filter((category) => !category.parentId)
          .map((category) => {
            return {
                label: category.name,
                value: category,
                items: categories?.filter((subCategory) => subCategory.parentId === category.id)
                  .map((subCategory) => {
                    return {
                        label: subCategory.name,
                        value: subCategory,
                    }
                  }),
            };
        });
    
    return (
      <Dropdown
        className="w-full"
        options={mapCategories}
        optionLabel='label'
        optionGroupLabel='label'
        optionGroupChildren='items'
        filter
        filterBy='label'
        value={categories?.find(c => c.id === selectedCategory)}
        onChange={(e) => onClickHandler(e.value as Category)}
      />
    );
}

export default CategoryDropDown;