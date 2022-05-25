import { Card } from "@components";
import { SupplyChainTimelineItem } from "@models";
import { classNames } from "@utils";

interface SupplyChainTimelineProps {
  supplyChainTimeline: SupplyChainTimelineItem[];
}

export const SupplyChainTimeline: React.FC<SupplyChainTimelineProps> = ({ supplyChainTimeline }) => {
  return (
    <Card>
        <section aria-labelledby="timeline-title" className="lg:col-start-3 lg:col-span-1">
          <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
            Supply Chain Timeline
          </h2>

          {/* Activity Feed */}
          <div className="mt-6 flow-root">
            <ul role="list" className="-mb-8">
              {supplyChainTimeline.map((item, itemIdx) => (
                <div key={item.id}>
                  {item.fulfilled && (
                    <li key={itemIdx}>
                      <div className="relative pb-8">
                        {itemIdx !== supplyChainTimeline.filter((i) => i.fulfilled).length - 1 ? (
                          <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                        ) : null}
                        <div className="relative flex space-x-3">
                          <div>
                            <span
                              className={classNames(
                                item.fulfilled ? item.type.bgColorClass : "bg-gray-400",
                                "h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white"
                              )}
                            >
                              <item.type.icon className="w-5 h-5 text-white" aria-hidden="true" />
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                            <div>
                              <p className="text-sm text-gray-500">
                                {!item.fulfilled && item.content}{" "}
                                <a className="font-medium text-gray-900">{item.target}</a>
                              </p>
                            </div>
                            <div className="text-right text-sm whitespace-nowrap text-gray-500">
                              <time dateTime={item.dateTime}>{item.date}</time>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  )}
                </div>
              ))}
            </ul>
          </div>
        </section>
    </Card>
  );
};
