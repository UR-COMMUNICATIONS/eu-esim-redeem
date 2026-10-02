const files = {
    store: {
        module: {
            plan: planSlice
        }
    },
    components: {
        commercial: {
            home: {
                InternetPackages,
            }
        }
    }
}

// components => commercial => home => InternetPackages
// store => module => plan => planSlice


// src\store\module\plan\planSlice.jsx
// src\store\module\howItWorks\HowItWorksSlice.jsx

// src\components\commercial\home\InternetPackage.jsx
// src\components\shared\cards\InternetPackageCard.jsx
// src\pages\commercial\PackageDetails.jsx
// src\components\commercial\packageDetails\PackageAccordion.jsx
// src\components\commercial\pocketWifi\home\RecomendedPackage.jsx
// src\components\shared\cards\PackageCard.jsx
// src\pages\commercial\pocketWifi\PocketWifiRegion.jsx
// src\pages\commercial\pocketWifi\PocketWifiPlan.jsx
// src\pages\commercial\sim\SimRegion.jsx
// src\pages\commercial\sim\SimPlan.jsx
// src\components\commercial\pocketWifi\home\Hero.jsx
// src\components\commercial\sim\home\Hero.jsx


// src\components\shared\navigation\AuthDialog.jsx



///////////////////////////////////// GIT COMMANDS  //////////////////////////

// git push yooweb-newdesign external_branch:external_branch
// git merge external_branch --allow-unrelated-histories




// 'YWGLD', 'SG', '2.5', 'SGD', '2.5', '9426'
// 'YWGLD', 'SG', '2.9', 'SGD', '2.9', '9427'
