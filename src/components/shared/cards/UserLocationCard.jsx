import { cn } from "@/lib/utils";
import { TrashIcon } from "@/services";

function UserLocationCard({
  item = {},
  handleSelect = () => { },
  wrapperClass = "",
  ...props
}) {
  return (
    <div
      className={cn(
        "p-6 rounded-xl border flex items-center gap-6 cursor-pointer",
        wrapperClass
      )}
      {...props}
      onClick={(event) => handleSelect(event, item, 'select')}
    >
      <div className="w-full">
        <h4 className="text-lg font-semibold text-black-900">{item?.fullName}</h4>
        <p className="text-sm sm:text-base md:text-lg text-black-600 mb-1 mt-2 sm:mb-2 sm:mt-4 md:mt-5">
          {item?.addressOne + ' ' + item?.addressTwo}
        </p>
        <p className="text-sm sm:text-base md:text-lg text-black-600">
          {item?.phone}
        </p>
      </div>
      <div>
        <button type="button" onClick={(event) => handleSelect(event, item, 'remove')}>
          <TrashIcon className="w-10 h-10" />
        </button>
      </div>
    </div>
  );
}

export default UserLocationCard;
