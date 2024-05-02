import React from 'react'

const Signup = () => {
    return (
        <>
            <div>
                <div class="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
                    <div class="flex items-center justify-center w-full lg:p-12">
                        <div class="flex items-center xl:p-10">
                            <form class="flex flex-col w-full h-full pb-6 text-center rounded-3xl">
                                <h3 class="mb-3 text-4xl font-extrabold text-base-content">Sign up</h3>
                                <p class="mb-4 text-base-content">Create your account</p>
                                <button class="px-4 py-2 border flex gap-2 btn bg-base-100 rounded-2xl">
                                    <img class="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
                                    <span>Sign up with Google</span>
                                </button>
                                <div class="flex items-center mb-3">
                                    <hr class="h-0 border-b border-solid border-base-200 grow" />
                                    <p class="mx-4 text-base-content">or</p>
                                    <hr class="h-0 border-b border-solid border-base-200 grow" />
                                </div>
                                <ul className="steps my-5 mx-full">
                                    <li className="step step-primary"></li>
                                    <li className="step"></li>
                                    <li className="step"></li>
                                    <li className="step"></li>
                                </ul>
                                <div class="grid grid-cols-2 gap-4">
                                    <div class="flex flex-col space-y-3 mb-5">
                                        <label for="name" class="mb-2 text-sm text-start text-base-content">First Name*</label>
                                        <input id="name" type="text" placeholder="Ahmed" class="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none input input-primary rounded-2xl" />
                                    </div>

                                    <div class="flex flex-col space-y-3 mb-5">
                                        <label for="last name" class="mb-2 text-sm text-start text-base-content">Last Name*</label>
                                        <input id="last name" type="text" placeholder="3abdel3aty" class="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none input input-primary rounded-2xl" />
                                    </div>

                                    <div class="flex flex-col space-y-3 mb-5">
                                        <label for="phone" class="mb-2 text-sm text-start text-base-content">Phone Number*</label>
                                        <input id="phone" type="text" placeholder="Enter your phone number" class="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none input input-primary rounded-2xl" />
                                    </div>
                                    <div class="flex flex-col space-y-3 mb-5">
                                        <label for="company name" class="mb-2 text-sm text-start text-base-content">Company Name*</label>
                                        <input id="company name" type="text" placeholder="Enter your company name" class="flex items
                                        -center w-full px-5 py-4 mr-2 text-sm font-medium outline-none input input-primary rounded-2xl" />
                                    </div>

                                    <div class="flex flex-col space-y-3 mb-5">
                                        <label for="email" class="mb-2 text-sm text-start text-base-content">Email*</label>
                                        <input id="email" type="email" placeholder="7amada@email.com" class="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none input input-primary rounded-2xl" />
                                    </div>
                                    <div class="flex flex-col space-y-3 mb-5">
                                        <label for="password" class="mb-2 text-sm text-start text-base-content">Password*</label>
                                        <input id="password" type="password" placeholder="Enter a password" class="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none input input-primary rounded-2xl" />
                                    </div>
                                </div>
                                <button class="w-full btn btn-primary rounded-2xl ">Sign Up</button>
                                <p class="text-sm leading-relaxed text-base-content">Have an account? <a href="login" class="font-bold text-base-content">Login</a></p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Signup