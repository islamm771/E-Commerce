const SectionHeader = ({ title }: { title: string }) => (
  <h5 className="text-sm font-semibold relative pl-6 text-red-600 mb-6
    before:content-[''] before:absolute before:-top-1 before:left-0
    before:w-3 before:h-7 before:bg-red-600 before:rounded-sm">
    {title}
  </h5>
)

export default SectionHeader;