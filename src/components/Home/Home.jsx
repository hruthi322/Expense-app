import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';
import { createExpense } from '../../redux/slices/createExpenseSlice';
import { fetchExpenses } from '../../redux/slices/expenseSlice';
import { deleteExpense } from '../../redux/slices/deleteExpenseSlice';
import './Home.scss';

function Home() {

    const email = useSelector((state) => state.userData?.user);
    const expensesState = useSelector((state) => state.expenses);
    const [isDeleted,setIsDeleted] = useState(false);
    const [isAdded,setIsAdded] = useState(false);
    const Total = expensesState?.data?.filter((expense)=>{
        return email === expense.user
    }).reduce((total,curr)=>{return total+=curr.amount;},0) || 0;


    const dispatch = useDispatch();

    function handleAuthentication() {
        if (email) {
            auth.signOut();
            alert("signed out");
        }
    }

    useEffect(() => {
        dispatch(fetchExpenses());
    },[ isDeleted, isAdded ]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const amount = document.querySelector('.amount')?.value;
        const name = document.querySelector('.name')?.value;
        const category = document.querySelector('.main__profile-form input[type="radio"]:checked')?.value;
        const data = {user:email,amount, name, category}
        
        if(amount && name && category){
            await dispatch(createExpense(data));
            setIsAdded(!isAdded);
        }
        document.querySelector('.amount').value="";
        document.querySelector('.name').value="";
        document.querySelector('.main__profile-form input[type="radio"]:checked').checked=false;
    }   
    const handleDelete = async (expenseId) => {
        await dispatch(deleteExpense(expenseId));
        setIsDeleted(!isDeleted);
    }
    return (
        <>
            <div className='main'>
                {email && <div className='main-display'>
                    <h1 className='main-display__name'>Expense List</h1>
                    <div className='main-display__total-expense'>
                        <p>Total :</p>
                        <div className='main-display__total-expense-amount'>
                            <h2 className='main-display__total-expense-amount-currency'>₹ {Total}</h2>
                        </div>
                    </div>
                    <div className='main-display__breakdown'>
                        <div className='main-display__breakdown-chevron-con'>
                            <p>Breakdown</p>
                            <span className='main-display__breakdown-chevron-icon'><svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#5f6368"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" /></svg></span>
                        </div>
                        <div className='main-display__expense'>
                            <ol className='main-display__expense-list'>
                               {!expensesState.isLoading ? (
                                 expensesState?.data?.filter((expense)=>{
                                    return email === expense.user
                                 })
                                 .map((expense)=>{
                                    return (
                                        <li className='main-display__expense-item' key = {expense._id}>
                                 <div className='main-display__expense-item-icon-box'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M240-80q-33 0-56.5-23.5T160-160v-480q0-33 23.5-56.5T240-720h80q0-66 47-113t113-47q66 0 113 47t47 113h80q33 0 56.5 23.5T800-640v480q0 33-23.5 56.5T720-80H240Zm0-80h480v-480h-80v80q0 17-11.5 28.5T600-520q-17 0-28.5-11.5T560-560v-80H400v80q0 17-11.5 28.5T360-520q-17 0-28.5-11.5T320-560v-80h-80v480Zm160-560h160q0-33-23.5-56.5T480-800q-33 0-56.5 23.5T400-720ZM240-160v-480 480Z" /></svg></div>
                                 <div className='main-display__expense-item-details'>
                                     <h3>{expense.name}</h3>
                                     <p>{expense.category}</p>
                                 </div>
                                 <div className='main-display__expense-item-details'>
                                     <h3>₹ {expense.amount}</h3>
                                     <p>{expense.date.toLocaleString("en-in").slice(0,10)}</p>
                                 </div>
                                 <button className='main-display__expense-item-delete' onClick={() => handleDelete(expense._id)}>
                                     <svg  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                                 </button>
                             </li>
                                    )
                                 })
                               ):<h2>Loading ...</h2>}
                               { !expensesState.data?.length ? <h2>Please add expenses</h2>:""}
                                
                            </ol>
                        </div>
                    </div>
                </div>}
                <div className='main__profile'>
                    <div className='main__profile-con'>
                        <h2 className='main__profile-name'> Hello,{email?.split('@')[0] || "Guest"}</h2>
                        {!email && <p>Please Sign in to add expense</p>}
                <Link to={!email && '/login'} className='header__login main__profile-sign-out' onClick={handleAuthentication}>{email ? "Sign out" : "Sign in "}</Link>
                {!email && <Link to={!email && '/login'} className='header__login main__profile-sign-out' >Create your Expense app Account</Link>}
                    </div>
                    {email && <div className='main__profile-form-con'>
                        <form className='main__profile-form' onSubmit={handleSubmit}>
                            <div className='main__profile-inp-field'>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M549-120 280-400v-80h140q53 0 91.5-34.5T558-600H240v-80h306q-17-35-50.5-57.5T420-760H240v-80h480v80H590q14 17 25 37t17 43h88v80h-81q-8 85-70 142.5T420-400h-29l269 280H549Z" /></svg>
                                <input className='amount' placeholder='Amount' type='number' min={1} name='amount' required  />
                            </div>
                            <div className='main__profile-inp-field'>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M446-80q-15 0-30-6t-27-18L103-390q-12-12-17.5-26.5T80-446q0-15 5.5-30t17.5-27l352-353q11-11 26-17.5t31-6.5h287q33 0 56.5 23.5T879-800v287q0 16-6 30.5T856-457L503-104q-12 12-27 18t-30 6Zm0-80 353-354v-286H513L160-446l286 286Zm253-480q25 0 42.5-17.5T759-700q0-25-17.5-42.5T699-760q-25 0-42.5 17.5T639-700q0 25 17.5 42.5T699-640ZM480-480Z" /></svg>
                                <input className='name' placeholder='place of spend' type='text' name='name' required />
                            </div>

                            <label className='main__profile-rad-field' htmlFor="Food/Beverages">
                                <input type="radio" name="category" id="Food/Beverages" value="Food/Beverages" />
                                Food/Beverages
                            </label>
                            <label className='main__profile-rad-field' htmlFor="Travel/Commute">
                                <input type="radio" name="category" id="Travel/Commute" value="Travel/Commute" />
                                Travel/Commute
                            </label>
                            <label className='main__profile-rad-field' htmlFor="Shopping">
                                <input type="radio" name="category" id="Shopping" value="Shopping"/>
                                Shopping
                            </label>

                            <div className='main__profile-submit'>
                                <button className="main__profile-submit-btn" type='submit'>Add to Expense</button>
                            </div>
                        </form>
                    </div>}
                </div>
            </div>
        </>

    )
}

export default Home