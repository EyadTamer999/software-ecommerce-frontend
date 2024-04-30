import React from 'react'

const Login = () => {
    return (

        <>
            <div>
                <div class="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
                    <div class="flex items-center justify-center w-full lg:p-12">
                        <div class="flex items-center xl:p-10">
                            <form class="flex flex-col w-full h-full pb-6 text-center rounded-3xl">
                                <h3 class="mb-3 text-4xl font-extrabold text-base-content">Sign In</h3>
                                <p class="mb-4 text-base-content">Enter your email and password</p>
                                <button class="px-4 py-2 border flex gap-2 btn bg-base-100 rounded-2xl">
                                    <img class="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
                                    <span>Sign in with Google</span>
                                </button>
                                <div class="flex items-center mb-3">
                                    <hr class="h-0 border-b border-solid border-base-200 grow" />
                                    <p class="mx-4 text-base-content">or</p>
                                    <hr class="h-0 border-b border-solid border-base-200 grow" />
                                </div>
                                <div class="flex flex-col space-y-3 mb-5">
                                    <label for="email" class="mb-2 text-sm text-start text-base-content">Email*</label>
                                    <input id="email" type="email" placeholder="7amada@email.com" class="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none input input-primary rounded-2xl" />
                                    <label for="password" class="mb-2 text-sm text-start text-base-content">Password*</label>
                                    <input id="password" type="password" placeholder="Enter a password" class="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none input input-primary rounded-2xl" />
                                </div>
                                <div class="flex flex-row justify-between mb-4">
                                    <label class="relative inline-flex items-center mr-3 cursor-pointer select-none">
                                        <input type="checkbox" defaultChecked className="checkbox checkbox-primary checkbox-sm" />
                                        <span class="ml-3 text-sm font-normal text-base-content">Keep me logged in</span>
                                    </label>
                                    <a href="javascript:void(0)" class="mr-3 text-sm font-medium text-base-content">Forget password?</a>
                                </div>
                                <button class="w-full btn btn-primary rounded-2xl ">Sign In</button>
                                <p class="text-sm leading-relaxed text-base-content">Not registered yet? <a href="register" class="font-bold text-base-content">Create an Account</a></p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login