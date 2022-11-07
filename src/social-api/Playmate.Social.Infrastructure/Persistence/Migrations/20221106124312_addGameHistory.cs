using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Playmate.Social.Infrastructure.Persistence.Migrations
{
    public partial class addGameHistory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "GameResults",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    GameId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    WinnerId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    LoserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GameResults", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GameResults_Games_GameId",
                        column: x => x.GameId,
                        principalTable: "Games",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_GameResults_Users_LoserId",
                        column: x => x.LoserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_GameResults_Users_WinnerId",
                        column: x => x.WinnerId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_GameResults_GameId",
                table: "GameResults",
                column: "GameId");

            migrationBuilder.CreateIndex(
                name: "IX_GameResults_LoserId",
                table: "GameResults",
                column: "LoserId");

            migrationBuilder.CreateIndex(
                name: "IX_GameResults_WinnerId",
                table: "GameResults",
                column: "WinnerId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GameResults");
        }
    }
}
