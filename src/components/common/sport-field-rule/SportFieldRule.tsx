import React from "react";

const rulesString =
  "Giữ xe ngay tại sân \n Phí giữ xe là 5k/xe \n Thời gian giữ sân là 15p, quá 15p sân sẽ được hủy tự động trên app \n Mang giày sai quy cách sẽ không được vào sân sai quy cách sẽ không được vào sân sai quy cách sẽ không được vào sân sai quy cách sẽ không được vào sân\n Không được đặt quá 5 tiếng 1 ngày \n Không hút thuốc tại sân \n Không hút thuốc tại sân \n Không hút thuốc tại sân \n Không hút thuốc tại sân \n Không hút thuốc tại sân \n Không hút thuốc tại sân \n Không hút thuốc tại sân \n Không hút thuốc tại sân \n Không hút thuốc tại sân \n Không hút thuốc tại sân";

const SportFieldRule = () => {
  const rules = rulesString.split("\n");

  return (
    <>
      <p className="body-2 text-neutral-700 font-bold mb-5">Quy định sân</p>
      <ul className="list-disc list-outside">
        {rules.map((rule, index) => (
          <li key={index} className="body-4 text-neutral-700 font-normal mb-3 ml-6">
            {rule}
          </li>
        ))}
      </ul>
    </>
  );
};

export default SportFieldRule;
