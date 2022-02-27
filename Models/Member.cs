using System;

namespace cbr_system.Models
{
    public class Member
    {
        public int id { get; set; }
        public string membership_no { get; set; }
        public string name { get; set; }

       public string father_name { get; set; }

        public string mobile_number { get; set; }

        public string email_address { get; set; }

        public string membership_category_id { get; set; }
        public DateTime reg_date { get; set; }
        public DateTime dbo { get; set; }

        public string cnic_number { get; set; }

        public int gender { get; set; }

        public string qualification { get; set; }

        public string profession { get; set; }

        public int? yearof_passing { get; set; }


        public string designation { get; set; }

        public string residential_address { get; set; }

        public string permanent_address { get; set; }

        public string province { get; set; }

        public string city { get; set; }

        public string  photo { get; set; }

        public byte[] display_photo { get; set; }

        public DateTime created_on { get; set; }

        public int created_by { get; set; }
    }
}
