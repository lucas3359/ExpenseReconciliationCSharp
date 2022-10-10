using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace ExpenseReconciliation.Migrations
{
    public partial class AddCategory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "amount",
                table: "transaction",
                type: "numeric",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "double precision");

            migrationBuilder.AddColumn<int>(
                name: "category_id",
                table: "transaction",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "category",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "text", nullable: false),
                    parent_id = table.Column<int>(type: "integer", nullable: true),
                    split_included = table.Column<bool>(type: "boolean", nullable: true),
                    default_split = table.Column<decimal>(type: "numeric", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_category", x => x.id);
                });

            migrationBuilder.CreateIndex(
                name: "ix_transaction_category_id",
                table: "transaction",
                column: "category_id");

            migrationBuilder.AddForeignKey(
                name: "fk_transaction_categories_category_id",
                table: "transaction",
                column: "category_id",
                principalTable: "category",
                principalColumn: "id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_transaction_categories_category_id",
                table: "transaction");

            migrationBuilder.DropTable(
                name: "category");

            migrationBuilder.DropIndex(
                name: "ix_transaction_category_id",
                table: "transaction");

            migrationBuilder.DropColumn(
                name: "category_id",
                table: "transaction");

            migrationBuilder.AlterColumn<double>(
                name: "amount",
                table: "transaction",
                type: "double precision",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric");
        }
    }
}
