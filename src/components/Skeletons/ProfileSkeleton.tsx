const ProfileSkeleton = () => {
  return (
    <div className="container mx-auto px-8 xl:px-24 pb-12">

      {/* Header */}
      <div className="flex items-center justify-between my-8">
        <div className="w-40 h-4 bg-gray-200 rounded-sm animate-pulse" />
        <div className="w-32 h-4 bg-gray-200 rounded-sm animate-pulse" />
      </div>

      <div className="grid grid-cols-12 gap-4 mt-16" role="status">

        {/* Aside */}
        <div className="hidden md:block md:col-span-3 shadow-md rounded-md p-5 animate-pulse space-y-6">
          <div>
            <div className="w-40 h-4 bg-gray-200 rounded-sm mb-4" />
            <div className="pl-5 space-y-3">
              <div className="w-24 h-3 bg-gray-200 rounded-sm" />
              <div className="w-28 h-3 bg-gray-200 rounded-sm" />
              <div className="w-36 h-3 bg-gray-200 rounded-sm" />
            </div>
          </div>
          <div>
            <div className="w-28 h-4 bg-gray-200 rounded-sm mb-4" />
            <div className="pl-5 space-y-3">
              <div className="w-24 h-3 bg-gray-200 rounded-sm" />
              <div className="w-32 h-3 bg-gray-200 rounded-sm" />
            </div>
          </div>
          <div className="w-24 h-4 bg-gray-200 rounded-sm" />
        </div>

        {/* Form */}
        <div className="col-span-12 md:col-span-9 shadow-md rounded-md p-5 lg:p-8 animate-pulse">

          {/* Title */}
          <div className="w-36 h-4 bg-gray-200 rounded-sm mb-8" />

          {/* Row 1 */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-20 mb-8">
            <div>
              <div className="w-24 h-3 bg-gray-200 rounded-sm mb-2" />
              <div className="w-full h-9 bg-gray-200 rounded-sm" />
            </div>
            <div>
              <div className="w-24 h-3 bg-gray-200 rounded-sm mb-2" />
              <div className="w-full h-9 bg-gray-200 rounded-sm" />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-20 mb-8">
            <div>
              <div className="w-16 h-3 bg-gray-200 rounded-sm mb-2" />
              <div className="w-full h-9 bg-gray-200 rounded-sm" />
            </div>
            <div>
              <div className="w-20 h-3 bg-gray-200 rounded-sm mb-2" />
              <div className="w-full h-9 bg-gray-200 rounded-sm" />
            </div>
          </div>

          {/* Password */}
          <div className="mb-8">
            <div className="w-36 h-3 bg-gray-200 rounded-sm mb-3" />
            <div className="space-y-3">
              <div className="w-full h-9 bg-gray-200 rounded-sm" />
              <div className="w-full h-9 bg-gray-200 rounded-sm" />
              <div className="w-full h-9 bg-gray-200 rounded-sm" />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 justify-end">
            <div className="w-16 h-9 bg-gray-200 rounded-sm" />
            <div className="w-28 h-9 bg-gray-200 rounded-sm" />
          </div>

        </div>
      </div>
    </div>
  )
}

export default ProfileSkeleton