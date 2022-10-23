import React, {useState} from 'react';
import Category from '../model/category';
import UpdateCategoryModel from '../model/updateCategoryModel';
import {useUpdateCategoryMutation} from '../api/transactionApi';

type DropDownProps = {
    transactionId: number;
    categories: Category[]|undefined;
    showDropDown: boolean;
    toggleDropDown: Function;
    categorySelection: Function;
};

const CategoryDropDown = ({
    transactionId,
    categories,
    categorySelection,
}:DropDownProps)=>{
    const [showDropDown, setShowDropDown] = useState<boolean>(false);
    const [updateCategory] = useUpdateCategoryMutation();
    
    const onClickHandler = async (category: Category): Promise<void> => {
        categorySelection(category.name);

        const body: UpdateCategoryModel = {
            transactionId: transactionId,
            category: category,
        };
        console.log(body);
        await updateCategory(body);
    };
    
    return (
        <>
            {categories?.map(
                (category: Category, index: number): JSX.Element => {
                    return (
                        <p
                            key={index}
                            onClick={(): void => {
                                onClickHandler(category);
                            }}
                        >
                            {category.name}
                        </p>
                    );
                }
            )}
        </>
    );
}

export default CategoryDropDown;