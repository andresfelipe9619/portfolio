

interface TimelineCardProps {
  year: string;
  items: {
    title: string;
    link: string | null;
  }[];
}

export function TimelineCard({ year, items }: TimelineCardProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="w-full sm:w-1/4">
        <h3 className="text-lg font-semibold">{year}</h3>
      </div>
      <div className="w-full sm:w-3/4">
        <ol className="relative border-l border-gray-200 dark:border-gray-700">
          {items.map((item, index) => (
            <li key={index} className="mb-10 ml-4">
              <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
              <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                    onClick={() => {
                      import('@/lib/ga').then(({ logEvent }) => {
                        logEvent('Timeline', 'Link Click', item.title);
                      });
                    }}
                  >
                    {item.title}
                  </a>
                ) : (
                  item.title
                )}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
