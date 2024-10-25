import { SubmitHandler, useForm } from 'react-hook-form';
import { userLogin } from '../app/features/loginSlice';
import { useAppDispatch, useAppSelector } from '../app/store';

interface LoginFormInputs {
    email: string;
    password: string;
}

const Login = () => {
    const dispatch = useAppDispatch()
    const { isLoading, error, data } = useAppSelector(state => state.login)
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();

    const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
        dispatch(userLogin(data))
    };

    console.log(data)

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center space-y-4'>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        {...register('email', { required: 'Email is required' })}
                        className='block border-2 border-solid border-indigo-500 w-[300px]'
                    />
                    {errors.email && <p className='text-xs text-red-600 font-semibold'>{errors.email.message}</p>}
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        {...register('password', { required: 'Password is required' })}
                        className='block border-2 border-solid border-indigo-500 w-[300px]'
                    />
                    {errors.password && <p className='text-xs text-red-600 font-semibold'>{errors.password.message}</p>}
                </div>


                {error && <p>{typeof error.response?.data === 'string' ? error.response.data : 'An error occurred'}</p>}


                <button type="submit" className='bg-indigo-500 py-2 px-4 rounded-md text-white'>Login</button>
            </form>
        </div>
    );
};

export default Login;
