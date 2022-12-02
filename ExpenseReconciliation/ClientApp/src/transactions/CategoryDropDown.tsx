import React from 'react';
import Category from '../model/category';
import UpdateCategoryModel from '../model/updateCategoryModel';
import {useUpdateCategoryMutation} from '../api/transactionApi';
import {Dropdown} from 'primereact/dropdown';
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
    
    const categorySelectItems = categories?.map((category: Category) => {
        return {
            label: category.name,
            value: category.id,
        };
    });
    
    return (
      <Dropdown
        options={categorySelectItems}
        value={selectedCategory}
        onChange={(e) => onClickHandler(categories?.find((category) => category.id === e.value) as Category)}
      />
    );
}

export default CategoryDropDown;