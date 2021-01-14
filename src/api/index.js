const faunadb = require("faunadb");
const q = faunadb.query;
const client = new faunadb.Client({
  secret: "fnAD_akb-9ACA0jbQH3Kp2Mkr6i_oQwTgtH0erOt",
});

export const sendMessage = (props) =>
  client.query(
    q.Create(q.Collection("clients"), {
      data: props,
    })
  );
