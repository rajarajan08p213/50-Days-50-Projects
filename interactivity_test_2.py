from datetime import datetime

import numpy as np
import pandas as pd
import plotly.express as px

import taipy.gui.builder as tgb
from taipy import Gui

end_date = datetime.today().date()
start_date = end_date.replace(day=1)
dates = [start_date, end_date]

df_total_bkgs = pd.read_csv(r"total_bookings.csv")
df_summary = pd.read_csv(r"summary_1.csv")

convert_start = str(start_date.strftime("%b %d %Y"))
convert_end = str(end_date.strftime("%b %d %Y"))
cnv_start_date = start_date.strftime("%Y-%m-%d")
cnv_end_date = end_date.strftime("%Y-%m-%d")


def pie_charts(dates):
    cnv_start_date = dates[0].strftime("%Y-%m-%d")
    cnv_end_date = dates[1].strftime("%Y-%m-%d")

    intial_flter_bkgs = df_total_bkgs.query(
        "cw_booked_date >= @cnv_start_date and cw_booked_date <= @cnv_end_date"
    )
    bkgs_ct = (
        intial_flter_bkgs.groupby(["Booking_type"]).size().reset_index(name="count")
    )
    total_bkgs = bkgs_ct["count"].sum()

    return bkgs_ct


def base_online_bkgs(dates):
    cnv_start_date = dates[0].strftime("%Y-%m-%d")
    cnv_end_date = dates[1].strftime("%Y-%m-%d")
    df_summary_2 = df_summary.query(
        "booked_date >= @cnv_start_date and booked_date <= @cnv_end_date"
    )
    fltr_base_bkgs = df_summary_2.groupby(["Customer_code"]).size()
    top_ten_customers = (
        fltr_base_bkgs.reset_index(name="Bookings_Count")
        .sort_values("Bookings_Count", ascending=False)
        .head(10)
    )
    customer = px.bar(
        top_ten_customers,
        x="Bookings_Count",
        y="Customer_code",
        orientation="h",
        color="Customer_code",
        text="Bookings_Count",
    )
    customer.update_traces(
        width=0.8,
        textposition="inside",
    )
    customer.update_layout(bargap=0.6)
    return customer


base_bkg_fig = base_online_bkgs(dates)

pie_data = pie_charts(dates)


def button_click(state):
    state = state
    state.pie_data = pie_charts(state.dates)
    state.convert_start = str(state.dates[0].strftime("%b %d %Y"))
    state.convert_end = str(state.dates[1].strftime("%b %d %Y"))
    state.base_bkg_fig = base_online_bkgs(state.dates)


def pie_click(state):
    print(state)


with tgb.Page() as page:
    with tgb.part(class_name="container"):
        tgb.text(
            value="# Booking Dashboard",
            mode="md",
            class_name="text-center text-color",
        )
        with tgb.layout(columns="0.8 1", class_name="card"):  # custom-bkg
            with tgb.part():
                tgb.date_range(
                    "{dates}", label_start="Start-date", label_end="End-date"
                )
            with tgb.part():
                tgb.button("Apply", class_name="plain", on_action=button_click)

        tgb.html("br")
        with tgb.layout(columns="1 1"):
            with tgb.part(class_name="card text-center"):
                tgb.text(
                    "Bookings from {convert_start} - {convert_end}",
                    class_name="text-chnges",
                )
                tgb.chart(
                    "{pie_data}",
                    type="pie",
                    values="count",
                    labels="Booking_type",
                    options={
                        "hole": 0.6,
                    },
                    on_click=pie_click,
                )
                # tgb.text("{selected}")

            with tgb.part(class_name="card "):
                tgb.text(
                    "Top 10 Booking customers",
                    class_name="text-chnges",
                )
                tgb.chart(figure="{base_bkg_fig}")


Gui(page=page).run(debug=True, port=5004, use_reloader=True, dark_mode=True)
