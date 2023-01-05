using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Playmate.Social.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class addProfilePictureName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ProfilePictureName",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProfilePictureName",
                table: "Users");
        }
    }
}
