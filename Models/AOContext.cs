using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cbr_system.Models
{
    public class AOContext
    {
        public string ConnectionString { get; set; }

        public AOContext(string connectionString)
        {
            this.ConnectionString = connectionString;
        }

        private MySqlConnection GetConnection()
        {
            return new MySqlConnection(ConnectionString);
        }
        public List<Member> GetAllAlbums()
        {
            List<Member> list = new List<Member>();

            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("select * from tbl_member", conn);

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        list.Add(new Member()
                        {
                            id = Convert.ToInt32(reader["Id"]),
                            membership_no =reader["membership_no"].ToString(),
                            name = reader["member_name"].ToString(),
                            father_name = reader["father_name"].ToString(),
                            cnic_number = reader["cnic_number"].ToString(),
                            mobile_number = reader["mobile_number"].ToString(),
                            designation = reader["designation"].ToString(),
                            email_address = reader["email_address"].ToString(),
                            dbo = Convert.ToDateTime(reader["dbo"]),
                            reg_date = Convert.ToDateTime(reader["reg_date"]),
                            qualification = reader["qualification"].ToString(),
                            membership_category_id = reader["membership_category_id"].ToString(),
                            permanent_address = reader["permanent_address"].ToString(),
                            residential_address = reader["residential_address"].ToString(),
                            photo = reader["photo"] !=null && reader["photo"].ToString().Length > 0 ? Convert.ToBase64String((byte[])reader["photo"]) :"",
                     //   photo =  reader["photo"].ToString(),
                            // Price = Convert.ToInt32(reader["Price"]),
                            //Genre = reader["genre"].ToString()
                        });
                    }
                }
            }
            return list;
        }

        public Member GetMemberbyid(int id)
        {
            Member member = new Member();

            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
           string query = @"select * from tbl_member where id=@Id";
                MySqlCommand cmd = new MySqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@Id",id);
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        member = new Member
                        {
                            id = Convert.ToInt32(reader["Id"]),
                            membership_no = reader["membership_no"].ToString(),
                            name = reader["member_name"].ToString(),
                            father_name = reader["father_name"].ToString(),
                            cnic_number = reader["cnic_number"].ToString(),
                            mobile_number = reader["mobile_number"].ToString(),
                            designation = reader["designation"].ToString(),
                            email_address = reader["email_address"].ToString(),
                            dbo = Convert.ToDateTime(reader["dbo"]),
                            reg_date = Convert.ToDateTime(reader["reg_date"]),
                            qualification = reader["qualification"].ToString(),
                            membership_category_id = reader["membership_category_id"].ToString(),
                            permanent_address = reader["permanent_address"].ToString(),
                            residential_address = reader["residential_address"].ToString(),
                            photo = reader["photo"] != null && reader["photo"].ToString().Length > 0 ? Convert.ToBase64String((byte[])reader["photo"]) : "",
                            //Genre = reader["genre"].ToString()
                        };
                    }
                }
            }
            return member;
        }

        public  bool Insert(Member member)
		{
			bool result = false;
            byte[] bytes = System.Convert.FromBase64String(member.photo.Substring(member.photo.LastIndexOf(',') + 1));
            member.display_photo = bytes;
            const string query = @"insert  into `tbl_member`(`membership_no`,`member_Name`,`cnic_number`,`dbo`,`mobile_number`,`email_address`,`membership_category_id`,`reg_date`,`gender_code`,`father_name`,`photo`,`created_on`,`created_at`,`updated_on`,`updated_at`,`is_deleted`) values 
(@membership_no,@name,@cnic_number,@dbo,@mobile_number,@email_address,@membership_category_id,@reg_date,@gender,@father_name,@photo,@created_at,1,NULL,NULL,0);";

            //,`qualification`,`yearof_passing`,`Summary`,`profession`,`designation`,`residential_address`,`permanent_address`,`province`,`city`,`photo`,
          //  'BS',2014,NULL,'Software Engineer','Sr. Software Engineer','abc','xyz','karachi','Karachi',
            try
			{
                using (MySqlConnection conn = GetConnection())
                {
                    MySqlCommand cmd = new MySqlCommand(query, conn);
                    // cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@membership_no", member.membership_no);
                    cmd.Parameters.AddWithValue("@membership_category_id", member.membership_category_id);
                    cmd.Parameters.AddWithValue("@name", member.name);
                    cmd.Parameters.AddWithValue("@father_name", member.father_name);
                    cmd.Parameters.AddWithValue("@photo",member.photo !="" ? member.display_photo : ((byte[])null));
                    cmd.Parameters.AddWithValue("@cnic_number", member.cnic_number);
                    cmd.Parameters.AddWithValue("@email_address", member.email_address);
                    cmd.Parameters.AddWithValue("@mobile_number", member.mobile_number);
                    cmd.Parameters.AddWithValue("@dbo", member.dbo);
                    cmd.Parameters.AddWithValue("@reg_date", DateTime.Now);
                    cmd.Parameters.AddWithValue("@gender", member.gender);
                    cmd.Parameters.AddWithValue("@created_at", DateTime.Now);

                    conn.Open();
                    int i = cmd.ExecuteNonQuery();
                    if (i > 0)
                    {
                        result = true;
                    }
                    else
                    {
                        result = false;
                    }
                }
            }
			catch (Exception ex)
			{
				//SqlHelper.LogException(ex);
				throw ex;
			}

			return result;
		}

        public string Readimage(byte[] data)
        {
            return Convert.ToBase64String(data);
        }

        public List<Member_Category> GetAllmemebershipcategory()
        {
            List<Member_Category> list = new List<Member_Category>();

            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("SELECT id,`Code`,`Description`,fee FROM `memebership_category`", conn);

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        list.Add(new Member_Category()
                        {
                            id = Convert.ToInt32(reader["Id"]),
                            Code = reader["Code"].ToString(),
                            Description = reader["Description"].ToString(),
                            fee =Decimal.Parse(reader["fee"].ToString()),
                         
                        });
                    }
                }
            }
            return list;
        }

        public List<Mohallah> GetAllMohallah()
        {
            List<Mohallah> list = new List<Mohallah>();

            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("SELECT id,`Code`,`Name` FROM `tbl_mohallah`", conn);

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        list.Add(new Mohallah()
                        {
                            id = Convert.ToInt32(reader["Id"]),
                            Code = reader["Code"].ToString(),
                            Name = reader["Name"].ToString(),

                        });
                    }
                }
            }
            return list;
        }
    }
}
