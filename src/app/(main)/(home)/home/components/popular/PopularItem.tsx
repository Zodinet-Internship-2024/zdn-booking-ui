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
  return (
    <div className="grid grid-cols-2 gap-4 pt-6 xl:grid-cols-4">
      <SportFieldInfoCard sportField={sportField} />
      <Calendar />
      <SportFieldRuleCard>
        <SportFieldRule />
      </SportFieldRuleCard>
      <SportFieldSwiper />
    </div>
  );
};

export default PopularItem;
