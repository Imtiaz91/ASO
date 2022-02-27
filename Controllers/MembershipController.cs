using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using cbr_system.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace cbr_system.Controllers
{
    [ApiController]
    [Route("membership")]
    public class MembershipController : ControllerBase
    {

        private readonly AOContext _context;

        public MembershipController(AOContext context) => _context = context;

        [HttpGet]
        public IActionResult Get()
        {
            IActionResult ret = null;
            List<Member> model = new List<Member>();
            try
            {
               
                    model = (_context.GetAllAlbums() ).ToList();
                if (model!=null && model.Count >0)
                {
                    ret = StatusCode(StatusCodes.Status200OK, model);
                }
                else
                    ret = StatusCode(StatusCodes.Status204NoContent, "Can't find memebers");

            }
            catch (Exception ex)
            {
            // LogMessage.Write(ex);
                ret = ret = StatusCode(StatusCodes.Status500InternalServerError, "Server error please contact admin.");
            }
            return ret;
        }

        [HttpPost]
        [Route("InsertMember")]
        public IActionResult PostMemeber(Member data)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                _context.Insert(data);
                // AOContext.SaveChanges();
            }
            catch (Exception e)
            {
                throw;
            }

            return Ok(data);
        }

        [HttpGet]
        [Route("GetMemberbyid")]
        public IActionResult GetMemberbyid(int id)
        {
            IActionResult ret = null;
            Member model = new Member();
            try
            {

                model = _context.GetMemberbyid(id);
                if (model != null)
                {
                    ret = StatusCode(StatusCodes.Status200OK, model);
                }
                else
                    ret = StatusCode(StatusCodes.Status204NoContent, "Can't find memebers");

            }
            catch (Exception ex)
            {
                // LogMessage.Write(ex);
                ret = ret = StatusCode(StatusCodes.Status500InternalServerError, "Server error please contact admin.");
            }
            return ret;
        }


        [HttpGet]
        [Route("GetAllMemberCategory")]
        public IActionResult GetAllMemberCategory()
        {
            IActionResult ret = null;
            List<Member_Category> model = new List<Member_Category>();
            try
            {

                model = (_context.GetAllmemebershipcategory()).ToList();
                if (model != null && model.Count > 0)
                {
                    ret = StatusCode(StatusCodes.Status200OK, model);
                }
                else
                    ret = StatusCode(StatusCodes.Status204NoContent, "Can't find Member Category");

            }
            catch (Exception ex)
            {
                // LogMessage.Write(ex);
                ret = ret = StatusCode(StatusCodes.Status500InternalServerError, "Server error please contact admin.");
            }
            return ret;
        }

        [HttpGet]
        [Route("GetAllMohallah")]
        public IActionResult GetAllMohallah()
        {
            IActionResult ret = null;
            List<Mohallah> model = new List<Mohallah>();
            try
            {

                model = (_context.GetAllMohallah()).ToList();
                if (model != null && model.Count > 0)
                {
                    ret = StatusCode(StatusCodes.Status200OK, model);
                }
                else
                    ret = StatusCode(StatusCodes.Status204NoContent, "Can't find Member Category");

            }
            catch (Exception ex)
            {
                // LogMessage.Write(ex);
                ret = ret = StatusCode(StatusCodes.Status500InternalServerError, "Server error please contact admin.");
            }
            return ret;
        }
    }
}
