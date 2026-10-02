import React from 'react';
import { commercialRoutes } from "@/services";
import useDynamicImages from '@/hooks/useDynamicImages';

const DeleteAccount = () => {
    return (
        <>
            <div className='flex flex-col md:flex-row min-h-screen bg-[#ECECEC] overflow-x-hidden select-none'>

                <div className='bg-[#FFFFFF] lg:pt-[0px] md:pt-[30px] py-[30px] md:rounded-[20px] shadow-[0px_4px_10px_rgba(0, 0, 0, 0.2)] lg:my-[120px] md:my-[160px] lg:mx-[170px] my-[140px]  m-auto md:mx-[50px] w-full'>
                    <div className="flex justify-center md:mb-[30px] mb-[20px] lg:mt-[60px]">
                        <img
                            className='inline w-full max-w-[200px] lg:h-[50px] lg:w-[180px] md:h-[50px] md:w-[180px] max-h-[60]'
                            src={useDynamicImages("others", "red-logo")}
                            alt='Web Icon'
                        />
                    </div>
                    {/* <h1 className='text-center font-medium text-sm md:text-lg lg:text-lg xl:text-xl 2xl:text-2xl md:px-[0px] px-[15px] lg:px-[0px]'>
                    Your account deletion request has been received, and we are currently processing it.
                    <br />
                    Please allow 3-5 working days for this action to be completed.
                    <br />
                    In the meantime, if you have any other inquiries, feel free to contact our 24/7
                    <br />
                    WhatsApp support @ <span className='text-[#E52226]'>+65 6100 9998</span>.
                </h1>
                <div className='flex justify-center'>
                    <div className='md:w-[412px] w-full md:px-0 px-[30px]'>
                    <input
                        required
                        className="appearance-none border rounded-[10px] w-full py-2 px-3 mt-[20px] text-gray-700 leading-tight focus:outline-none focus:shadow-outline md:h-[55px] h-[40px] pl-[20px] text-[15px] "
                        name="userId"
                        type="text"
                        placeholder="Email Address"
                    />
                    </div>
                </div>
                <div className='flex justify-center'>
                    <div className='md:w-[412px] mt-[20px] w-full md:px-0 px-[30px]'>
                    <AppButton title="Submit" 
                    />
                    </div>
                </div> */}
                    <div className="mx-16">
                        <h1 className="text-2xl font-semibold mb-4">Data Deletion Request</h1>
                        <p className="mb-4">Thank you for using Yoowifi. We respect your privacy and offer you the option to request the deletion of your account and associated data from our system. To initiate the data deletion process, please follow these steps:</p>

                        <ol className="list-decimal pl-6 mb-6">
                            <li className="mb-2"> <strong>Submit a Deletion Request:</strong>
                                <ul className="list-disc pl-6">
                                    <li className="mb-2">Send an email to our Data Protection Officer at <a href="mailto:hello@yoowifi.com" className="text-[#E52226]">hello@yoowifi.com</a> from the email address or phone number associated with your Yoowifi account.</li>
                                    <li className="mb-2">In the subject line, write "Data Deletion Request".</li>
                                    <li className="mb-2">In the body of the email, clearly state that you wish to delete your account and associated data from our system.</li>
                                </ul>
                            </li>

                            <li className="mb-2"><strong>Verification Process:</strong>
                                <ul className="list-disc pl-6">
                                    <li className="mb-2">Our team will verify your identity based on the information provided in your deletion request.</li>
                                    <li className="mb-2">Ensure that the email address or phone number used for the deletion request matches the one associated with your Yoowifi account.</li>
                                </ul>
                            </li>

                            <li className="mb-2"><strong>Confirmation of Deletion:</strong>
                                <ul className="list-disc pl-6">
                                    <li className="mb-2">Once your identity is verified, we will proceed to delete your account and associated data from our system.</li>
                                    <li className="mb-2">You will receive a confirmation email once the deletion process is complete.</li>
                                </ul>
                            </li>

                            <li className="mb-2"><strong>Types of Data Deleted:</strong>
                                <p>Your account deletion request includes the deletion of the following types of data:</p>
                                <ul className="list-disc pl-6">
                                    <li>Name</li>
                                    <li>Email Address</li>
                                    <li>Phone Number</li>
                                    <li>Date of Birth</li>
                                    <li>Residential Address (if provided)</li>
                                    <li>Payment Info (if provided)</li>
                                </ul>
                            </li>

                            <li className="mb-2"><strong>Retention Period:</strong>
                                <ul className="list-disc pl-6">
                                    <li>Your personal data will be deleted from our system within 3-5 working days from the date of your deletion request.</li>
                                    <li>Minimal transactional data necessary for legal or business purposes may be retained as required by applicable laws.</li>
                                </ul>
                            </li>
                        </ol>

                        <p class="mb-4">For more information please read our <a href={commercialRoutes.privacyPolicy.path} class="text-[#E52226] underline">Privacy Policy</a> and <a href={commercialRoutes.termsService.path} class="text-[#E52226] underline">Terms of Service</a>.</p>

                        <p className="mb-4">If you have any questions or concerns regarding the data deletion process, please feel free to contact our Data Protection Officer at <a href="https://wa.me/6561009998?text=Hello,%20I%20would%20like%20to%20get%20in%20touch." target="_blank"
                            rel="noopener noreferrer" className="text-[#E52226]">+65 6100 9998</a>.</p>

                        <p>Thank you for your cooperation.</p>
                        <p className="mt-4">Sincerely,<br /> The Yoowifi Team</p>
                    </div>
                </div>

            </div>
        </>
    );

}
export default DeleteAccount;





