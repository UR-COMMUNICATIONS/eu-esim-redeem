import PackageAccordion from '@/components/commercial/packageDetails/PackageAccordion';
import CustomerTestimonial from '@/components/shared/others/CustomerTestimonial';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const PackageDetails = () => {

    const { cart } = useSelector((state) => state.cart)
    const { packageId } = useParams();
    const { packages, localPlans } = useSelector(state => state.plan);
    // const findData = packages.find(item => item._id.toString() === packageId.toString());
    let findData = null
    if (cart.compflowType == 'LP') {  // LP localPlans , PP priorityPlans
        findData = localPlans.find(item => item.planCode === cart.package?.planCode);
    }
    else {
        findData = packages.find(item => item.planCode === cart.package?.planCode);
    }

    return (
        <div className="overflow-hidden w-full">
            <PackageAccordion data={findData} />
            <CustomerTestimonial />
        </div>
    );
};

export default PackageDetails;