import Calendar from "@/components/calendar/Calendar";
import SportFieldRule from "@/components/common/sport-field-rule/SportFieldRule";
import SportFieldRuleCard from "@/components/common/sport-field-rule/SportFieldRuleCard";
import SportFieldSwiper from "@/components/common/SportFieldSwiper";
import SportFieldInfoCard from "@/components/sport-field/SportFieldInfoCard";
import React from "react";

type PopularItemProps = {
  sportField: SportField;
};
const PopularItem = ({ sportField }: PopularItemProps) => {
  const imageUrls = sportField.sportFieldImages?.map((image) => image.url);
  return (
    <div className="grid grid-cols-1 gap-4 pt-6 sm:grid-cols-2 xl:grid-cols-4">
      <SportFieldInfoCard sportField={sportField} />
      <Calendar sportField={sportField} />
      <SportFieldRuleCard>
        <SportFieldRule rulesString={sportField.rule ?? ''} />
      </SportFieldRuleCard>
      <SportFieldSwiper images={imageUrls} />
    </div>
  );
};

export default PopularItem;
