import { APP_IMAGES } from "@/constants/AppImages";
import { ProductTypesImageMappingT } from "@/types/device";
const SIM_ESIM = ['sim', 'esim', 'e', 's', 'cmi', '3hk'];

const ESIM = ['esim', 'cmi', '3hk', 'e'];

const SHIPPING_WITH_ADDRESS_REQUIRED = ['domestic', 'international'];


export const TYPES_MAPPER = {
    SIM_ESIM,
    ESIM,
    SHIPPING_WITH_ADDRESS_REQUIRED
}

export const PRODUCT_TYPES_MAPPING = {
    D: {
        imageSource: APP_IMAGES.device_3d,
        labelTranslationKey: 'pocket_wifi',
        code: 'D',
        deviceTypesList: ['D'],
    },
    S: {
        imageSource: APP_IMAGES.sim_3d,
        labelTranslationKey: 'sim',
        code: 'S',
        deviceTypesList: ['S', 'E'],
    },
    E: {
        imageSource: APP_IMAGES.sim_3d,
        labelTranslationKey: 'e_sim',
        code: 'E',
        deviceTypesList: ['E'],
    }
}