export const depositTable = {
  headers: ["Tour Type", "Minimum Deposit required per person (SGD)"],
  rows: [
    ["All Group Tour Packages (Except Cruise)", "$1,000.00"],
    [
      "All Group Tour Package with Domestic Flight & Arctic Packages",
      "$2,000.00",
    ],
    [
      "Cruise & Special departure Group Tour Packages, South America Tour Packages",
      "$4,000.00",
    ],
    ["Free & Easy Packages", "80% of total tour fare"],
    [
      "Tour organised by third (3rd) parties (e.g. luxury cruise, overseas land operator, airline etc.)",
      "Amount per Terms & Conditions stipulated by principal suppliers",
    ],
  ],
};

export const cancellationTable = {
  headers: [
    "NO. OF DAYS BETWEEN DEPARTURE AND RECEIPT OF CANCELLATION NOTICE",
    "Minimum Cancellation fee per person (SGD)",
  ],
  rows: [
    ["35 working days or more", "100% of minimum Deposit Amount"],
    [
      "15 to 34 working days",
      "100% of minimum Deposit Amount or 50% of tour fare + Taxes, whichever is higher",
    ],
    [
      "08 to 14 working days",
      "100% of minimum Deposit Amount or 75% of tour fare + Taxes, whichever is higher",
    ],
    ["07 working days and below", "Full tour fare + Taxes"],
  ],
};

export const euTourBookingTermsSections = [
  {
    number: "1",
    title: "RESERVATION, DEPOSIT & FULL PAYMENT",
    items: [
      {
        number: "1.1",
        text: "If your minimum deposit is less than the required amount, kindly top up the difference within the next two (2) days.",
        table: depositTable,
      },
      {
        number: "1.2",
        text: "Payment of deposit does not constitute confirmation of the tour. All group tours are subject to a minimum group size (as determined by the Company) in order for the confirmation to be effected and for the departure to be finalised.",
      },
      {
        number: "1.3",
        text: "Full payment is required no later than twenty-one (21) days prior to departure. In case of tours in peak season, full payment must be made one month before departure. If full payment is not received by the stipulated deadline, the Company reserves the right to forfeit the deposit and cancel the reservation. In such an event, the cancellation fee as stated in Section 2 is payable by the Customer.",
      },
      {
        number: "1.4",
        text: "By making deposit and balance payment, it is deemed that you have read, understood and accepted the Tour Booking Terms and Conditions in the booking form.",
      },
      {
        number: "1.5",
        text: "The Company reserves the right to request for a top-up on initial deposit for immediate issuance of air tickets, to avoid incurring additional surcharges.",
      },
      {
        number: "1.6",
        text: "Customers must top-up the deposits for ticket issuance as and when the air-tickets are required to be issued by the airlines at the stipulated dateline without prior notice. Failure to do so, the Company has the right to cancel the tour and the deposit will be forfeited.",
      },
    ],
  },
  {
    number: "2",
    title: "CANCELLATION BY THE CUSTOMER",
    items: [
      {
        number: "2.1",
        text: "Cancellation of booking must be made in writing or in person to avoid any misunderstandings.",
      },
      {
        number: "2.2",
        text: "The following cancellation fees apply once any group tour package booking is made:",
        table: cancellationTable,
      },
      {
        number: "2.3",
        text: "The above cancellation fees apply if the air-tickets are not issued. If the air-tickets are issued, the value of the air-tickets will be added onto the cancellation fees. The Company reserves the right to issue air-tickets without prior notice. If the deposit amount is insufficient to cover the cancellation fee, the Customer must pay for the difference.",
      },
      {
        number: "2.4",
        text: "'Working days' refer to Mondays to Fridays, excluding public holidays.",
      },
      {
        number: "2.5",
        text: "For Free and Easy packages, administrative fees and / or minimum one (1) night hotel rate will be imposed for those travel documents not issued. Upon issuance of travel documents, changes will not be allowed and have no refund value.",
      },
      {
        number: "2.6",
        text: "For any cancellation of one customer in a twin/double sharing room, the other customer sharing the same room will need to top up an additional single supplement charge, unless the customer who cancelled had paid the full tour fare and taxes as the cancellation fee.",
      },
    ],
  },
  {
    number: "3",
    title: "CANCELLATION BY THE COMPANY",
    items: [
      {
        number: "3.1",
        text: "The Company acts as an agent for service suppliers. After deposit or full payment has been made, all arrangements are still subject to final confirmation by service suppliers. At times due to low subscription for a group tour, the Company may choose to cancel the entire tour fourteen (14) days prior to departure.",
      },
      {
        number: "3.2",
        text: "The Company shall also not be held liable for any contingent costs incurred by the Customer arising from the cancellation.",
      },
      {
        number: "3.3",
        text: "The Company may recommend alternative tours either to the same destination or other tours, based on the current tour fare of that cancellation period. All prior special discounts given will be not extended for the alternative tours. Should the Customer decide not to accept the alternatives, a full refund on the amount paid by the Customer will be made accordingly by the Company without further obligation or liabilities on the part of the Company and that the Customer shall be deemed to have agreed to release the Company from all liabilities or damages in connection with the cancellation. There shall be no claim for inconvenience, loss of leave and transportation cost due to the cancellation of tour.",
      },
    ],
  },
  {
    number: "4",
    title: "REFUND POLICY",
    items: [
      {
        number: "4.1",
        text: "No refunds will be made with respect to accommodation, meals, sightseeing tours or any other services included in the tour fare but not utilised by the Customer, either in part or full, or when the Customer amends, cancels or otherwise changes any arrangements after commencement of the tour.",
      },
      {
        number: "4.2",
        text: "All refunds will be made within fifteen (15) working days. For credit card payments, refunds will be made through the credit card company and subject to individual bank processing time.",
      },
      {
        number: "4.3",
        text: "Air tickets with refund value will only be refunded to Customers within fifteen (15) working days after the respective airlines have refunded to the Company. The standard processing period for air-ticket refunds vary from three (3) to six (6) months (subject to individual airlines). However, Group and Promotional tickets are non-refundable.",
      },
      {
        number: "4.4",
        text: "During peak period, the refund process may be longer due to increase in transactions.",
      },
    ],
  },
  {
    number: "5",
    title: "AMENDMENT TO BOOKINGS (REQUESTED BY PASSENGERS)",
    items: [
      {
        number: "5.1",
        text: "For any changes in departure date or tour type, cancellation fees apply as listed under Section 2 on Cancellation by the Customer.",
      },
      {
        number: "5.2",
        text: "For every request made regardless of whether any previous amendment was confirmed by airlines, hotel or otherwise, there will be a minimum fee of $250.00 per person per amendment. This does not include any other fees imposed by the airlines, ground operator or hotel.",
      },
      {
        number: "5.3",
        text: "A postponement of tour by the Customer for any reason is considered as cancellation. Under such circumstances, the above Cancellation Policies will apply accordingly.",
      },
      {
        number: "5.4",
        text: "Any changes made by the Customer to the existing booking must be in writing or in person at least twenty one (21) days before the tour, after which strictly NO amendments are allowed, or cancellation fee applies.",
      },
      {
        number: "5.5",
        text: "Any replacement or change of passengers will be considered as a cancellation and not an amendment. This term is applicable to all cases, including but not restricted to medical and pregnancy cases.",
      },
    ],
  },
  {
    number: "6",
    title: "AMENDMENT TO TOUR ITINERARY BY COMPANY",
    items: [
      {
        text: "The Company makes reasonable effort to avoid changes in the itinerary. However, the Company reserves the right to make minor changes at any time due to unforeseen circumstances, especially during peak periods or in the event of other circumstances beyond our control.",
      },
    ],
  },
  {
    number: "7",
    title: "EXTENSION OF STAY / DEVIATION",
    items: [
      {
        number: "7.1",
        text: "Extension of stay may be permitted at the end of tour, subject to the restriction of the air ticket, seat availability and hotel confirmation prior to the commencement of the tour. All requests must be made before issuance of air tickets. If the extension of stay / deviation is unable to be confirmed three (3) weeks prior to the group's departure date, the passenger is deemed to stick to the original tour schedule. In the event that the original schedule has been changed by the Company, any extra cost will be borne by the Customer.",
      },
      {
        number: "7.2",
        text: "Cancellation fee is also applicable if the Customer cancels the booking because the extension / deviation is unable to be confirmed prior to departure.",
      },
      {
        number: "7.3",
        text: "Extension of stay / deviation will be at the Customer's own expense and transfer to the airport will not be provided.",
      },
      {
        number: "7.4",
        text: "It is the Customer's responsibility to hold firm confirmation of their return flight and to re-confirm their flight 72 hours prior to their return date.",
      },
      {
        number: "7.5",
        text: "The air ticket issued is a special ticket, restricted to the specific airline only. It is non-negotiable, non-endorsable, non-reissuable, non-refundable & non-reroutable. Any alteration in routing or dates by the Customer is solely at his/her own risk. The Company and its associated agents will not be held responsible for any inconvenience caused and extra expenses incurred. No refunds will be made for any unused air ticket, accommodation, meals, or sightseeing in part or full.",
      },
    ],
  },
  {
    number: "8",
    title: "TRAVEL DOCUMENTS, TRAVEL INSURANCE & TRAVEL VOUCHERS",
    subsections: [
      {
        number: "8.1",
        title: "Passport and other Travel Documents",
        text: "It is the Customer's sole responsibility to ensure that he/she has a valid passport with minimum six (6) months validity from the date of scheduled return to Singapore, as well as the necessary visas, vaccinations, health certificates and all necessary travel documents as required by various government authorities of the destinations of travel.",
      },
      {
        number: "8.2",
        title: "Visa",
        text: "The Customer may seek advice from the Company on visa application; however, it is the Customer's own responsibility to obtain a valid visa.",
        items: [
          {
            number: "8.2.1",
            text: "If for any reason, application for visa or exit permit is rejected (please refer to clause 2.2).",
          },
          {
            number: "8.2.2",
            text: "It is the Customer's responsibility to check that multi-entry Visas have the correct entry dates and destinations before travelling. Please be aware that for some itineraries you may travel through a country without making an overnight stop but you will still require a Visa to enter/exit the country.",
          },
          {
            number: "8.2.3",
            text: "In consideration of the interests of other passengers in the same group, the Company strongly discourages all passengers from applying for Visa Upon Arrival at the destination country. The Company takes no responsibility for being unable to wait for passengers who apply for Visa Upon Arrival at the Customs.",
          },
          {
            number: "8.2.4",
            text: "The Company will not be responsible for any expenses, reimbursement or refund of the tour fare if the Customer is deported or refused entry by immigration authorities on the tour for whatever reasons, including improper travel documents, quarantine, custom regulations, possession of unlawful items or irregularities that may cause harm or damage to person or property.",
          },
          {
            number: "8.2.5",
            text: "For non-Singapore passport holders, please request for the Company to check on Visa requirements. The Company renders assistance in Visa application wherever possible. The Company cannot, however, guarantee the approval of Visa applications. This service is subject to (auxiliary) fees. Please check with the Company on the amount.",
          },
        ],
      },
      {
        number: "8.3",
        title: "Travel Insurance",
        items: [
          {
            number: "8.3.1",
            text: "Arrangement of travel insurance coverage is strongly recommended with respect to unforeseen circumstances such as flight cancellation, trip cancellation, loss of deposit, baggage, personal accident, injury, illness, etc. Under no circumstances shall the Company be construed as a carrier under a contract for safe carriage of the Customer or his/her baggage and other personal belongings.",
          },
          {
            number: "8.3.2",
            text: "The Company shall not be responsible for any loss or damage in relation to flight cancellation, trip cancellation, loss of personal baggage, accidents, injuries and illness.",
          },
          {
            number: "8.3.3",
            text: "Should there be any amendment to the date and duration of travel, it is the Customer's responsibility to inform the travel insurance company to amend the date and duration of the insurance coverage.",
          },
          {
            number: "8.3.4",
            text: "The Company will be pleased to assist in the enquiries of any travel insurance and related matters.",
          },
        ],
      },
      {
        number: "8.4",
        title: "Travel Vouchers",
        text: "The Company issues travel vouchers from time to time as part of its promotional activities. The Terms and Conditions for the redemption of travel vouchers are clearly spelt out in the appropriate documents and shall be binding on the Customer.",
      },
    ],
  },
  {
    number: "9",
    title: "GENERAL MATTERS RELATING TO TOURS",
    subsections: [
      {
        number: "9.1",
        title: "Accommodation",
        uppercase: true,
        text: "ACCOMMODATION IS AS SPECIFIED IN THE TOUR BROCHURE / ITINERARY / TOUR BOOKING FORM. IN THE EVENT THE SPECIFIED ACCOMMODATION IS NOT AVAILABLE, EVERY EFFORT WILL BE MADE TO SCOUT FOR AN ALTERNATIVE IN ANOTHER ACCOMMODATION OF SIMILAR STANDARD. HOTEL ROOM SIZES, FACILITIES AND SERVICES MAY VARY IN DIFFERENT COUNTRY. ACCOMMODATION FOR ADULTS IS BASED ON TWIN-SHARE, DOUBLE OR TRIPLE-SHARE ROOMS. DIFFERENT ROOM TYPE MIGHT NOT BE ON THE SAME LEVEL. SINGLE ROOM OCCUPANCY COMES WITH AN ADDITIONAL COST.",
        items: [
          {
            number: "9.1.1",
            text: "Room size is generally slightly smaller than what you may be used to. Space is precious commodity in Europe and especially in its busiest cities. Many of the buildings will have been in existence for hundreds of years and were not built with the modern traveller in mind. The upside is that they are usually in excellent locations and have a fascinating story to tell.",
          },
          {
            number: "9.1.2",
            text: "Bed sizes may also differ. In Europe, King and Queen-sized beds are very rare. Here, double beds are the norm and you may often find that a double room consists of two twin beds pushed together instead of a full bed, made up with one set of linen. You may also find that twin beds will be placed very close together.",
          },
          {
            number: "9.1.3",
            text: "A triple room is the same size as a twin-share room. The third bed is always a roll-away bed or sofa bed added into the room. As a result, you may feel that the room is very cramped and small.",
          },
          {
            number: "9.1.4",
            text: "Europeans are very socially and environmentally conscious, especially about air-conditioning in Europe. During autumn and winter seasons, the central air-conditioning will be switched off in the hotel rooms. So, do not expect that the air-conditioning will be switched on in the room. You may open the windows to let cold air in, where possible.",
          },
        ],
      },
      {
        number: "9.2",
        title: "Special Request",
        text: "If there are any requests regarding special meals, dietary requirements, adjoining rooms, flight seating arrangement and so on, please inform the Company upon booking. However, such requests are strictly subject to confirmation and availability by the airlines/hotels. There are no halal meals on tour.",
      },
      {
        number: "9.3",
        title: "Baggage",
        text: "The Customer is usually allowed check-in baggage not exceeding twenty (20) kilograms. Only one piece of hand-luggage not exceeding seven (7) kilograms is allowed on board the aircraft. Excess baggage charges must be borne by the Customer and are subject to individual airlines' company policy.",
      },
      {
        number: "9.4",
        title: "Meals",
        items: [
          {
            number: "9.4.1",
            text: "Meals, including meals served on flights, are as indicated in the tour brochure / itinerary / tour booking form. In the event where in-flight meals are not served due to whatever reasons, there shall be no refund or replacement.",
          },
          {
            number: "9.4.2",
            text: "You and your travelling companions will generally dine together at a designated time. Table will often vary in size and free seating enables you to dine with family members or new travelling companions each evening. A breakfast buffet is included daily and will reflect the local regions' tastes and culture. Very occasionally, an early departure may result in a light breakfast box for you to take away if applicable. Lunches are sometimes included but are usually an opportunity for the guest to enjoy some free time to visit a local café, bar or restaurant and eat where the locals do. Your tour manager will be able to provide you with a range of options to suit all tastes and preferences.",
          },
        ],
      },
      {
        number: "9.5",
        title: "Seat Rotation",
        text: "For the convenience of all members of the group, passengers may be requested to rotate their seating arrangements on the coach during the period of the tour. Please cooperate when requested to do so by the tour manager / tour leader / guide.",
      },
      {
        number: "9.6",
        title: "Motor-coach",
        text: "For selected itineraries with Wi-Fi on coach using 3G mobile network, it means that the connection is slower than standard broadband and at times may not be available. It is good for checking emails, web browsing and updating social media accounts, but less so for streaming videos or large photo uploads.",
      },
      {
        number: "9.7",
        title: "Single Room Supplement",
        text: "Please note that customers paying for single room occupancy supplement charge will be allocated a single room. The single room supplement charge as indicated in the booking form applies. Hotels will try their best to upgrade twin/double room for guests who opt for single room occupancy, but this may not be possible in the event when hotel occupancy rate is high.",
      },
      {
        number: "9.8",
        title: "Suggested Excursion",
        text: "Optional list may be subject to change, depending on the time you are travelling or local circumstances including weather and days of the week. Further information will be provided by your Tour Manager / Guides during the tour.",
      },
      {
        number: "9.9",
        title: "Flights",
        text: "The tour group might be comprised of flights on different airlines, so the Tour Manager may not be on the same flight as the group. If the group is not on the same flight as the Tour Manager, the group will have to proceed to transit on their own. There will be a check-in staff at Singapore Changi Airport to assist the group to check in if the Tour Manager is not flying together.",
      },
    ],
  },
  {
    number: "10",
    title: "PRICING POLICIES",
    subsections: [
      {
        number: "10.1",
        title: "Tour Fare Includes",
        text: "Return economy class group tour air ticket, local transport, accommodation, admission fees, meals and sightseeing programme as stipulated in the tour brochure / itinerary / tour booking form.",
      },
      {
        number: "10.2",
        title: "Tour Fare Excludes",
        text: "Airport taxes, airport security taxes, airline insurance surcharges, fuel taxes, visa fees, travel insurance, customs user fees as specified by the airlines and airport authorities; local transfer not stated in the itinerary (e.g. free & easy, deviation), laundry, excess baggage charges, beverages, room services, gratuities to drivers and tour managers / local guides and tips to hotel porters (if any); and personal expenses. Please refer to the Company for visa fees, gratuities to drivers and tour managers / local guides, and tips to hotel porters.",
      },
      {
        number: "10.3",
        title: "Cancellation Fee",
        text: "For Clause 2 – Cancellation By The Customer - tour fare refers to the selling tour fare plus airport taxes, airport security taxes, airline insurance surcharges and fuel taxes.",
      },
      {
        number: "10.4",
        title: "Child Fare",
        text: "Child fare is applicable to children below twelve (12) years old on the scheduled date of departure & departure date from Singapore. The child fare is based on a twin-sharing accommodation with two adults and no additional bed will be provided. A surcharge will be imposed where an extra bed is required for the child or where the child occupies a room with only one adult.",
      },
      {
        number: "10.5",
        title: "Mode of Payment",
        text: "Payment may be made in cash, by NETS, PAYNOW, AXS, cheques or credit cards. Cheques will only be accepted if presented to the Company at least seven (7) working days before scheduled tour departure. Credit card payment may incur additional surcharge for special promotion packages, you may refer to our staff for confirmation. Overseas Bank transfer may incur additional surcharge and to be borne by the Customer.",
      },
    ],
  },
  {
    number: "11",
    title: "RESPONSIBILITY",
    items: [
      {
        number: "11.1",
        text: "The Company acts as an agent for the carriers, transportation companies, hotels and other principals of the tour packages. The Company accepts no responsibility for any injuries, losses, damages, accidents, flight cancellations, delays, theft, quarantine, customs regulations, strikes, weather hazards, political unrest, changes in itineraries, deportation or refusal of entry by Immigration Authorities resulting from improper travel documents, possession of unlawful items or irregularities that may cause damage to person or property. Any losses and/or expenses incurred are the responsibility of the passenger. Ensuring all proper travel documentation is in place is the sole responsibility of the Customer.",
      },
      {
        number: "11.2",
        text: "The failure of the Customer to follow reasonable instructions, including but not limited to check-in and check-out places or times or other cause and the losses and/or expenses resulting therefore shall be borne by the Customer.",
      },
      {
        number: "11.3",
        text: "The Company reserves the right to:",
        nested: [
          {
            number: "11.3.1",
            text: "Alter tour itineraries, travel arrangements, accommodation due to unforeseen changes.",
          },
          {
            number: "11.3.2",
            text: "Cancel any reservations prior to departure for reasons, including but not limited to insufficient number of participants. The Company will recommend alternative tours, preferably to the same destination or to other destinations. Should the Customer decide not to accept the alternatives, the deposit or tour fare is to be refunded without further obligation on the part of the Company, upon the Customer's surrender to the Company of all documents issued by the Company for the purpose of the tour package.",
          },
          {
            number: "11.3.3",
            text: "Require any individual to withdraw from the tour if it is deemed that his/her behaviour is detrimental to or incompatible with the health, safety, interests, harmony and welfare of the other tour participants and the tour group as a whole. Under such circumstances, the Company shall be under no liability thereafter to any such person.",
          },
          {
            number: "11.3.4",
            text: "To specify the language in which the tour guide will conduct commentary in.",
          },
        ],
      },
      {
        number: "11.4",
        text: "No tour guides, tour managers, tour leaders or other employees or agents of the Company are authorised to commit the Company to any liability and the Company shall not be bound by any statement or representation unless it is in writing and signed by a Management Executive of the Company.",
      },
      {
        number: "11.5",
        text: "All verbal agreements must be stated in writing and duly signed by the Manager.",
      },
      {
        number: "11.6",
        text: "The Company reserves the right to take photographs and videos of the Customer while he/she is on tour with the Company, to be used for advertising in brochures or publicity materials without obtaining any further consent from the Customer.",
      },
      {
        number: "11.7",
        text: "All tour fares for the respective tour packages are correct at the time of reservation. The Company reserves the right to revise the tour fares and to determine the date of commencement of such revised tour fares.",
      },
    ],
  },
  {
    number: "12",
    title: "COMPLAINT & CLAIM",
    items: [
      {
        text: "Should you encounter a problem during your tour, kindly inform the EU Holidays Tour Manager or local supplier immediately, who will try to make things right. If the matter was not resolved locally, please submit a feedback to EU Holidays in writing within seven (7) days from the date of return. It is important to provide us the information quickly. Please quote your booking reference number and all relevant information. Failure to follow this procedure may delay or deny us the opportunity to investigate and rectify the problem, which may affect the way your complaint is dealt with and your rights under this contract.",
      },
    ],
  },
  {
    number: "13",
    title: "MISCELLANEOUS",
    items: [
      {
        text: "The Company reserves the right to change, amend, insert or delete any Tour Booking Terms and Conditions contained within this document, as the case may be, without prior notice. The Tour Booking Terms and Conditions complement those Terms and Conditions contained in the relevant documents provided by third (3rd) party service providers such as airlines or cruise tickets, hotel check-ins etc.",
      },
    ],
  },
];
