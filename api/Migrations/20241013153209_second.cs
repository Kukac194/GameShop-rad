using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class second : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "title",
                table: "Igrica",
                newName: "naslov");

            migrationBuilder.AddColumn<int>(
                name: "ProizvodacId",
                table: "Igrica",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "cijena",
                table: "Igrica",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "godinaIzdanja",
                table: "Igrica",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Drzava",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    naziv = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Drzava", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Recenzije",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    recenzija = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    igricaId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Recenzije", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Recenzije_Igrica_igricaId",
                        column: x => x.igricaId,
                        principalTable: "Igrica",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Proizvodac",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    drzavaId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Proizvodac", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Proizvodac_Drzava_drzavaId",
                        column: x => x.drzavaId,
                        principalTable: "Drzava",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Igrica_ProizvodacId",
                table: "Igrica",
                column: "ProizvodacId");

            migrationBuilder.CreateIndex(
                name: "IX_Proizvodac_drzavaId",
                table: "Proizvodac",
                column: "drzavaId");

            migrationBuilder.CreateIndex(
                name: "IX_Recenzije_igricaId",
                table: "Recenzije",
                column: "igricaId");

            migrationBuilder.AddForeignKey(
                name: "FK_Igrica_Proizvodac_ProizvodacId",
                table: "Igrica",
                column: "ProizvodacId",
                principalTable: "Proizvodac",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Igrica_Proizvodac_ProizvodacId",
                table: "Igrica");

            migrationBuilder.DropTable(
                name: "Proizvodac");

            migrationBuilder.DropTable(
                name: "Recenzije");

            migrationBuilder.DropTable(
                name: "Drzava");

            migrationBuilder.DropIndex(
                name: "IX_Igrica_ProizvodacId",
                table: "Igrica");

            migrationBuilder.DropColumn(
                name: "ProizvodacId",
                table: "Igrica");

            migrationBuilder.DropColumn(
                name: "cijena",
                table: "Igrica");

            migrationBuilder.DropColumn(
                name: "godinaIzdanja",
                table: "Igrica");

            migrationBuilder.RenameColumn(
                name: "naslov",
                table: "Igrica",
                newName: "title");
        }
    }
}
