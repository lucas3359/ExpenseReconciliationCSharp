import React, {useState} from 'react';
import Category from '../model/category';
import UpdateCategoryModel from '../model/updateCategoryModel';
import updateCategory from '../services/category';
import {useAppSelector} from '../hooks/hooks';
import {selectToken} from '../auth/authSlice';

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
    const token = useAppSelector(selectToken);
    
    const onClickHandler = async (category: Category): Promise<void> => {
        categorySelection(category.name);

        const body: UpdateCategoryModel = {
            transactionId: transactionId,
            category: category,
        };
        console.log(body);
        await updateCategory(body, token);
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