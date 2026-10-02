function ServiceCard({ icon, image, title, description, ...props }) {
  return (
    <div
      className="px-4 py-5 border border-main-300 rounded-2xl flex flex-col items-center gap-4"
      {...props}
    >
      <div className="mb-2 w-[60px] h-[60px] flex items-center justify-center">
        {icon && icon()}
        {image && (
          <img
            src={image}
            alt={`service icon ${title}`}
            className="w-full h-full object-contain"
          />
        )}
      </div>
      <h3 className="text-lg font-semibold text-black-900 leading-[140%] text-center">
        {title}
      </h3>
      <p className="text-sm md:text-base text-black-600 text-center">
        {description}
      </p>
    </div>
  );
}

export default ServiceCard;
